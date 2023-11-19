"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, useMediaQuery } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { notifyError } from "@/app/logic/logic";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IProps {
  currentUser: IUser;
  followings: IUser[];
}
const Followings = (props: IProps) => {
  const { currentUser, followings } = props;
  const { data: session } = useSession();
  const router = useRouter();

  const isScreen400 = useMediaQuery("(max-width:400px)");

  const handleFollow = async (userId: string, isFollow: boolean) => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/follow/${userId}`,
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
      // fetchCurrentUser();
      // if (!isFollow) {
      //   socket?.emit("follow", {
      //     sender: session?.user,
      //     post: { author: user },
      //     type: "follow",
      //     createdAt: new Date(),
      //   });
      // }
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <List dense={true}>
      {followings?.map((user) => (
        <ListItem disablePadding key={user?._id}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar src={user?.avatar} alt={user?.name} />
            </ListItemIcon>
            <ListItemText primary={user?.name} sx={{ width: "200px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}/>
            <Button
              variant="outlined"
              sx={{width: "150px"}}
              onClick={() =>
                handleFollow(
                  user?._id,
                  currentUser?.followers?.some((u) => u._id === user?._id)
                )
              }
            >
              <RemoveIcon /> {isScreen400 ? "" : "Unfollow"}
            </Button>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Followings;
