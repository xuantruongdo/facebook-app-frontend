"use client";

import * as React from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { sendRequest } from "@/utils/api";
import { useChatContext } from "@/app/lib/chat.context";
import AddIcon from "@mui/icons-material/Add";
import { useSession } from "next-auth/react";
import { notifyError, notifySuccess } from "@/app/logic/logic";
import { useRouter } from "next/navigation";

const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "300px",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "hidden",
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };
interface IProps {
  openModalAdd: boolean;
  setOpenModalAdd: (v: boolean) => void;
}

const ModalAddMember = (props: IProps) => {
  const { openModalAdd, setOpenModalAdd } = props;
  const { data: session } = useSession();
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [usersNotInSelectedChat, setUsersNotInSelectedChat] =
    React.useState<IUser[]>();
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;
  const router = useRouter();
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (id: string) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const fetchUsers = async () => {
    const res = await sendRequest<IBackendRes<IUser[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      method: "GET",
    });

    if (res && res.data) {
      setUsers(res.data);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    setUsersNotInSelectedChat(
      users.filter(
        (user) =>
          !selectedChat?.users.find(
            (selectedUser: any) => selectedUser._id === user._id
          )
      )
    );
  }, [selectedChat]);

  const handleAddMember = async () => {
    const res = await sendRequest<IBackendRes<IChat>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/add/${selectedChat?._id}`,
      method: "PATCH",
      body: {
        users: checked,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res?.data) {
      await sendRequest<IBackendRes<any>>({
        url: `/api/revalidate`,
        method: "GET",
        queryParams: {
          tag: "access-chat",
          secret: "truongdo",
        },
      });
      router.refresh();
      notifySuccess("Add members to group chat successfully");
      setSelectedChat(res.data);
      setChecked([]);
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <Modal open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
      <Box sx={style} className="modal-chat">
        <Typography
          sx={{ fontSize: "24px", textAlign: "center", marginBottom: "10px" }}
        >
          Add members to group chat
        </Typography>
        <List
          dense
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            height: "150px",
            overflow: "auto"
          }}
        >
          {usersNotInSelectedChat?.map((user: IUser, index: number) => {
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(user?._id)}
                    checked={checked.indexOf(user?._id) !== -1}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {checked?.length > 0 && (
          <Button
            variant="outlined"
            color="primary"
            sx={{ float: "right" }}
            onClick={handleAddMember}
          >
            <AddIcon /> Add members
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ModalAddMember;
