"use client";

import * as React from "react";
import { Card, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import { sendRequest } from "@/utils/api";
import { checkReceiver } from "@/app/logic/logic";
import { useSession } from "next-auth/react";
import { useChatContext } from "@/app/lib/chat.context";
import { useRouter } from "next/navigation";

interface IProps {
  myChats: IChat[];
}
const MyChats = (props: IProps) => {
  const { myChats } = props;
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const [userSearch, setUserSearch] = React.useState<IUser[]>();
  const router = useRouter();

  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setChats(myChats);
  }, [selectedChat?.latestMessage]);

  const handleSearch = async (name: string) => {
    if (name) {
      const res = await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        method: "GET",
        queryParams: {
          name: `/${name}/i`,
        },
      });

      if (res && res.data) {
        //@ts-ignore
        setUserSearch(res.data);
      }
    } else {
      setUserSearch([]);
    }
  };

  const handleAccess = async (receivedId: string) => {
    const res = await sendRequest<IBackendRes<IChat[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: { receivedId: receivedId },
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
      setOpen(false);
      router.refresh();
      setChats([res.data, ...chats]);
      setSelectedChat(res.data);
    }
  };

  return (
    <>
      <Card
        sx={{ flex: 1, background: "white", minHeight: "calc(100vh - 104px)" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={() => setOpen(!open)}>
            Search user
          </Button>
          <Button variant="contained">Create a group</Button>
        </Box>

        <List sx={{ width: "100%" }}>
          {chats?.map((chat: any) => (
            <ListItem
              alignItems="flex-start"
              key={chat?._id}
              onClick={() => setSelectedChat(chat)}
            >
              <ListItemButton
                sx={{
                  background:
                    selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat?._id === chat?._id ? "white" : "black",
                  "&:hover": {
                    backgroundColor:
                      selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8", // Bỏ hiệu ứng hover
                    color: selectedChat?._id === chat?._id ? "white" : "black",
                  },
                }}
              >
                <ListItemAvatar>
                  {!chat?.isGroupChat && (
                    <Avatar
                      alt="user"
                      src={
                        //@ts-ignore
                        checkReceiver(chat?.users, session?.user?._id)?.avatar
                      }
                    />
                  )}
                </ListItemAvatar>
                <Box>
                  <Typography>
                    {
                      //@ts-ignore
                      !chat?.isGroupChat &&
                        checkReceiver(chat?.users, session?.user?._id!)?.name
                    }
                  </Typography>
                  {chat?.latestMessage && (
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {
                          //@ts-ignore
                          `${chat?.latestMessage?.sender?.name}: `
                        }
                      </Typography>
                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: "12px",
                          width: "150px",
                          whiteSpace: "nowrap", // Chỉ hiển thị một dòng
                          overflow: "hidden", // Ẩn nội dung vượt quá chiều rộng
                          textOverflow: "ellipsis", // (tùy chọn) Hiển thị dấu chấm (...) nếu nội dung quá dài
                        }}
                      >
                        {
                          //@ts-ignore
                          `${chat?.latestMessage?.content}`
                        }
                      </Typography>
                    </Box>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
      <Drawer open={open} onClose={handleClose}>
        <Box sx={{ width: "500px", padding: "20px" }}>
          <TextField
            variant="standard"
            label="Search user"
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
          <List dense sx={{ width: "100%", maxWidth: 360 }}>
            {userSearch?.map((user: IUser) => {
              if(user?._id === session?.user?._id) return <div key={user?._id}></div>
              return (
                <ListItem
                key={user?._id}
                disablePadding
                onClick={() => handleAccess(user?._id)}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} />
                </ListItemButton>
              </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MyChats;
