"use client";

import * as React from "react";
import { Box, Button, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useChatContext } from "@/app/lib/chat.context";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/app/logic/logic";
import ModalAddMember from "./modal.addmember";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface IProps {
  openModalSetting: boolean;
  setOpenModalSetting: (v: boolean) => void;
}
const ModalSetting = (props: IProps) => {
  const isScreenMin900 = useMediaQuery("(min-width:900px)");
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const isScreen600 = useMediaQuery("(max-width:600px)");
  const isScreen400 = useMediaQuery("(max-width:400px)");

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "max-content",
    width: isScreen400 ? "90%" : isScreen600 ? "80%" : isScreen900 ? "80%" : isScreenMin900 ? "40%" : "",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "hidden",
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };

  const { openModalSetting, setOpenModalSetting } = props;
  const { data: session } = useSession();

  const [openModalAdd, setOpenModalAdd] = React.useState<boolean>(false);
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;

  const [chatName, setChatName] = React.useState<string>("");
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

  const handleClose = () => {
    setOpenModalSetting(false);
    setChecked([]);
  };

  const handleOpenAddModal = () => {
    setOpenModalSetting(false);
    setOpenModalAdd(true);
  };

  const handleRename = async () => {
    const res = await sendRequest<IBackendRes<IChat>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/rename/${selectedChat?._id}`,
      method: "PATCH",
      body: {
        chatName: chatName,
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
      notifySuccess("Update group chat name successfully");
      setSelectedChat((chat: IChat) => ({
        ...chat,
        chatName: res?.data?.chatName,
      }));
    }
  };

  const handleRemove = async () => {
    const res = await sendRequest<IBackendRes<IChat>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/remove/${selectedChat?._id}`,
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
      notifySuccess("Remove user from group chat successfully");
      setSelectedChat(res.data);
      setChecked([]);
    } else {
      notifyError(res?.message);
    }
  };

  const handleLeave = async () => {
    const res = await sendRequest<IBackendRes<IChat>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/leave/${selectedChat?._id}`,
      method: "PATCH",
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
      notifySuccess("Leave group chat successfully");
      setSelectedChat(null);
      handleClose();
    } else {
      notifyError(res?.message);
    }
  };
  return (
    <>
      <Modal open={openModalSetting} onClose={handleClose}>
        <Box sx={style} className="modal-chat">
          <Typography
            sx={{ fontSize: "24px", textAlign: "center", marginBottom: "20px" }}
          >
            Update Group Chat
          </Typography>
          <Divider />
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              sx={{ height: "50px", display: "flex", justifyContent: "center" }}
              variant="outlined"
              placeholder="Chat name"
              fullWidth
              defaultValue={selectedChat?.chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <Button
              sx={{ height: "35px" }}
              variant="contained"
              onClick={handleRename}
            >
              Update
            </Button>
          </Box>
          <Button variant="outlined" onClick={handleOpenAddModal}>
            Add members
          </Button>
          <List
            dense
            sx={{
              width: "100%",
              marginTop: "20px",
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "200px",
              paddingTop: "50px",
              overflow: "auto",
            }}
          >
            {selectedChat?.users.map((user: IUser, index: number) => {
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
          <Button
            variant="outlined"
            color="error"
            sx={{ float: "right", marginTop: "20px" }}
            onClick={handleLeave}
          >
            <ExitToAppIcon /> Leave
          </Button>
          {checked?.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              sx={{ float: "left", marginTop: "20px" }}
              onClick={handleRemove}
            >
              <DeleteIcon /> Remove
            </Button>
          )}
        </Box>
      </Modal>
      <ModalAddMember
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
      />
    </>
  );
};

export default ModalSetting;
