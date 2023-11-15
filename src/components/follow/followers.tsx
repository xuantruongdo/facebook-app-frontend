"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Avatar, Button, useMediaQuery } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifyError } from "@/app/logic/logic";
import { useUserContext } from "@/app/lib/user.context";

interface IProps {
  currentUser: IUser;
  followers: IUser[];
}
const Followers = (props: IProps) => {
  const { currentUser, followers } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const { socket, setSocket } = useUserContext() as IUserContext;
  const isMobileScreen = useMediaQuery("(max-width:400px)");

  const handleFollow = async (user: IUser, isFollow: boolean) => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/follow/${user?._id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      await sendRequest<IBackendRes<any>>({
        url: `/api/revalidate`,
        method: "GET",
        queryParams: {
          tag: "follow-user",
          secret: "truongdo",
        },
      });
      router.refresh();
      if (!isFollow) {
        socket?.emit("follow", {
          sender: session?.user,
          post: { author: user },
          type: "follow",
          createdAt: new Date(),
        });
      }
    } else {
      notifyError(res?.message);
    }
  };
  return (
    <List dense={true}>
      {followers?.map((user) => (
        <ListItem disablePadding key={user?._id}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar src={user?.avatar} alt={user?.name} />
            </ListItemIcon>
            <ListItemText primary={user?.name} sx={{ width: "200px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}/>
            {currentUser?.followings?.some((u) => u._id === user?._id) ? (
              <Button
                variant="outlined"
                sx={{width: "150px"}}
                onClick={() =>
                  handleFollow(
                    user,
                    currentUser?.followings?.some((u) => u._id === user?._id)
                  )
                }
              >
                <RemoveIcon /> {isMobileScreen ? "": "Unfollow"}
              </Button>
            ) : (
              <Button
                  variant="outlined"
                  sx={{width: "150px"}}
                onClick={() =>
                  handleFollow(
                    user,
                    currentUser?.followings?.some((u) => u._id === user?._id)
                  )
                }
              >
                <AddIcon /> {isMobileScreen ? "": "Follow"}
              </Button>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Followers;
