"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useUserContext } from "@/app/lib/user.context";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useChatContext } from "@/app/lib/chat.context";
import { useRouter } from "next/navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface IProps {
  open?: boolean;
  setOpen?: (v: boolean) => void;
}

const RightBar = (props: IProps) => {
  const { open, setOpen } = props;
  const { data: session } = useSession();
  const { socket, setSocket, onlineUsers, setOnlineUsers } =
    useUserContext() as IUserContext;
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;
  const router = useRouter();
  const [onlineInfo, setOnlineInfo] = React.useState<IUser[]>();

  const fetchOnlineUsers = async () => {
    const res = await sendRequest<IBackendRes<IUser[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/find-all-with-id`,
      method: "POST",
      body: {
        ids: onlineUsers,
      },
    });

    if (res && res?.data) {
      setOnlineInfo(res.data);
    }
  };

  React.useEffect(() => {
    fetchOnlineUsers();
  }, [onlineUsers]);

  const handleAccess = async (receivedId: string) => {
    const res = await sendRequest<IBackendRes<IChat>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: { receivedId: receivedId },
    });

    if (res && res.data) {
      router.refresh();
      setSelectedChat(res.data);
      socket?.emit("joinRoom", res.data._id);
      router.push("/chat");
      if (setOpen) {
        setOpen(false);
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "10px",
        background: "white",
        borderRadius: "5px",
        marginTop: "20px",
        position: "sticky",
        top: "70px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Events
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            See all
          </Typography>
        </Box>
        <Typography sx={{ margin: "15px", fontWeight: 500 }}>
          No data...
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Advertisement
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            Close
          </Typography>
        </Box>
        <img
          src="https://blog.authenticjourneys.info/wp-content/uploads/2016/10/gd-group-discussion-tips.jpg"
          alt="ads"
          style={{ width: "100%" }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Conversation
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            Hide Chat
          </Typography>
        </Box>
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "auto",
            height: "230px",
          }}
        >
          {onlineInfo?.map((user) => {
            if (user?._id === session?.user?._id)
              return <div key={user?._id}></div>;
            return (
              <ListItem
                key={user?._id}
                disablePadding
                onClick={() => handleAccess(user?._id)}
              >
                <ListItemButton>
                  <ListItemAvatar className="avatar">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt={user?.name} src={user?.avatar} />
                    </StyledBadge>
                  </ListItemAvatar>

                  <ListItemText primary={user?.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
