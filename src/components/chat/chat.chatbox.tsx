"use client";

import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import * as React from "react";
import ScrollableChat from "./chat.scrollable";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useChatContext } from "@/app/lib/chat.context";
import { useRouter } from "next/navigation";
import {
  checkReceiver,
  isValidContent,
  notifyError,
  notifySuccess,
} from "@/app/logic/logic";
import ModalSetting from "./modal.setting";
import { useUserContext } from "@/app/lib/user.context";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ChatBox = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;
  const [content, setContent] = React.useState<string>("");
  const { socket, setSocket } = useUserContext() as IUserContext;
  const [messages, setMessages] = React.useState<IMessage[]>();
  const [openModalSetting, setOpenModalSetting] =
    React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (text: string) => {
    setContent(text);
  };

  const fetchMessagesChat = async () => {
    const res = await sendRequest<IBackendRes<IMessage[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages/${selectedChat?._id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res?.data) {
      setMessages(res.data);
    }
  };

  React.useEffect(() => {
    if (selectedChat) {
      fetchMessagesChat();
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (!isValidContent(content)) {
      notifyError("Please fill in the message content");
      return;
    }

    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages`,
      method: "POST",
      body: {
        content: content,
        chat: selectedChat?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      await sendRequest<IBackendRes<any>>({
        url: `/api/revalidate`,
        method: "GET",
        queryParams: {
          tag: "access-chat",
          secret: "truongdo",
        },
      });
      router.refresh();
      fetchMessagesChat();
      setContent("");
      socket?.emit("joinRoom", selectedChat?._id);
      socket?.emit("sendMessage", {
        room: selectedChat?._id,
        message: res.data,
      });
    } else {
      notifyError(res?.message);
    }
  };

  React.useEffect(() => {
    socket?.on("newMessage", (message: any) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket?.off(`newMessage`);
    };
  }, [socket]);

  const handleDeleteGroup = async () => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/${selectedChat?._id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      router.refresh();
      setSelectedChat(null);
      notifySuccess("Deleted group chat successfully");
      handleClose();
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <Card sx={{ flex: 2, height: "calc(100vh - 150px)" }}>
      {selectedChat ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            {session?.user?._id === selectedChat?.groupAdmin?._id ? (
              <Button
                color="error"
                variant="outlined"
                onClick={handleClickOpen}
              >
                <RemoveCircleIcon />
              </Button>
            ) : (
              <div></div>
            )}
            <Typography component={"h2"} sx={{ fontSize: "24px" }}>
              {selectedChat && !selectedChat?.isGroupChat
                ? checkReceiver(selectedChat?.users, session?.user?._id!)?.name
                : selectedChat?.chatName}
            </Typography>
            {selectedChat && selectedChat?.isGroupChat ? (
              <Button
                variant="contained"
                onClick={() => setOpenModalSetting(true)}
              >
                <RemoveRedEyeIcon />
              </Button>
            ) : (
              <div></div>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "91%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px",
              background: "#e8e8e8",
              overflowY: "hidden",
            }}
          >
            <ScrollableChat messages={messages!} />
            <TextField
              variant="outlined"
              placeholder="Type text in here ..."
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              sx={{ margin: "10px 0" }}
            />
          </Box>
        </>
      ) : (
        <Typography
          sx={{
            fontSize: "30px",
            textAlign: "center",
            color: "gray",
            marginTop: "20px",
          }}
        >
          Click A Box Chat
        </Typography>
      )}

      <ModalSetting
        openModalSetting={openModalSetting}
        setOpenModalSetting={setOpenModalSetting}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure to delete the chat ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to restore the chat and its messgaes. Or
            consider before deleting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteGroup} autoFocus color="error">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ChatBox;
