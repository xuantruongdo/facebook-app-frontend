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
import { toast } from "react-toastify";
import { checkReceiver } from "@/app/logic/logic";
import io, { Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:8002";

const ChatBox = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;
  const [content, setContent] = React.useState<string>("");

  const [socket, setSocket] = React.useState<Socket>();
  // const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<IMessage[]>();

  const handleChange = (text: string) => {
    setContent(text);
  };
  

  const notify = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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

  const handleSubmit = async () => {
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
      socket?.emit("message", res.data);
    } else {
      notify(res?.message);
    }
  };

  React.useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [setSocket]);

  React.useEffect(() => {
    // Handle incoming messages
    if (socket) {
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages!, message]);
        // Handle the message as needed
      });
  
    }
  
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, setMessages]);


  return (
    <Card sx={{ flex: 2, height: "calc(100vh - 104px)" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <div></div>
        <Typography component={"h2"} sx={{ fontSize: "24px" }}>
          {selectedChat && !selectedChat?.isGroupChat
            ? checkReceiver(selectedChat?.users, session?.user?._id!)?.name
            : selectedChat?.chatName}
        </Typography>
        {selectedChat && selectedChat?.isGroupChat ? (
          <Button variant="contained">
            <RemoveRedEyeIcon />
          </Button>
        ) : (
          <div></div>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          background: "#e8e8e8",
          overflowY: "hidden",
        }}
      >
        <ScrollableChat messages={messages!} />
        {/* {isTyping && <div>Loading...</div>} */}
        <TextField
          variant="standard"
          placeholder="Text..."
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </Box>
    </Card>
  );
};

export default ChatBox;
