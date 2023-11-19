"use client";

import * as React from "react";
import { Box, Button, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useChatContext } from "@/app/lib/chat.context";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/app/logic/logic";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
}
const ModalCreateGroup = (props: IProps) => {
  const isScreenMin900 = useMediaQuery("(min-width:900px)");
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const isScreen600 = useMediaQuery("(max-width:600px)");
  const isScreen400 = useMediaQuery("(max-width:400px)");

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "60%",
    width: isScreen400 ? "90%" : isScreen600 ? "80%" : isScreen900 ? "80%" : isScreenMin900 ? "40%" : "",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "hidden",
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };

  const { openModal, setOpenModal } = props;
  const { data: session } = useSession();
  const [chatName, setChatName] = React.useState<string>();
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<string[]>([]);
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;
  const router = useRouter();

  const handleClose = () => {
    setOpenModal(false);
    setSelectedUser([]);
  };

  const getUserById = (userId: string) => {
    return users.find((user) => user?._id === userId);
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

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedUser>) => {
    const {
      target: { value },
    } = event;
    setSelectedUser(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCreateGroup = async () => {
    const res = await sendRequest<IBackendRes<IUser[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/create`,
      method: "POST",
      body: {
        chatName: chatName,
        users: selectedUser,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res?.data) {
      router.refresh();
      setChats([res.data, ...chats]);
      setSelectedChat(res.data);
      setSelectedUser([]);
      handleClose();
      notifySuccess("Create a group chat successfully");
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          sx={{ fontSize: "24px", textAlign: "center", marginBottom: "20px" }}
        >
          Create Group Chat
        </Typography>
        <Divider />
        <Box sx={{ margin: "20px 0" }}>
          <TextField
            label="Chat Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setChatName(e.target.value)}
          />
          <Select
            sx={{
              margin: "20px 0",
            }}
            fullWidth
            multiple
            value={selectedUser}
            onChange={handleChange}
            input={<OutlinedInput label="Users" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={getUserById(value)?.name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {users.map((user) => {
              if (user?._id === session?.user?._id)
                return <div key={user?._id}></div>;
              return (
                <MenuItem
                  key={user?._id}
                  value={user?._id}
                  style={getStyles(user?._id, selectedUser, theme)}
                >
                  {user?.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            variant="contained"
            sx={{ float: "right", marginTop: "10px" }}
            onClick={handleCreateGroup}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateGroup;
