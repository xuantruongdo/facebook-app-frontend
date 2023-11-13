"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import VerifiedIcon from "@mui/icons-material/Verified";
import RemoveIcon from "@mui/icons-material/Remove";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/lib/user.context";
import { notifyError } from "@/app/logic/logic";

interface IProps {
  user: IUser;
}
const ProfileDashboard = (props: IProps) => {
  const { user } = props;
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const { socket, setSocket } = useUserContext() as IUserContext;
  const router = useRouter();

  const fetchCurrentUser = async () => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${session?.user?._id}`,
      method: "GET",
      nextOption: {
        next: { tags: ["follow-user"] },
      },
    });

    if (res && res.data) {
      setCurrentUser(res.data);
    }
  };

  React.useEffect(() => {
    fetchCurrentUser();
  }, [session?.user?._id]);

  const handleFollow = async (isFollow: boolean) => {
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
      fetchCurrentUser();
      if (!isFollow) {
        socket?.emit("follow", {
          sender: session?.user,
          post: {author: user},
          type: "follow",
          createdAt: new Date(),
        });
      }
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <Box>
      <Box sx={{ width: "100%", height: "360px", background: "#aaa" }}>
        {user?.cover && (
          <img
            src={user?.cover}
            alt="cover"
            style={{
              width: "100%",
              height: "360px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          padding: "20px",
          background: "white",
          borderRadius: "5px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={user?.avatar}
            alt="avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ marginLeft: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography
                sx={{ fontWeight: "bold", color: "#626262", fontSize: "24px" }}
              >
                {user?.name}
              </Typography>
              {user?.isActive && <VerifiedIcon color="primary" />}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#626262",
                marginTop: "10px",
              }}
            >
              <RssFeedIcon />
              <Typography sx={{ fontSize: "12px", margin: "5px 0" }}>
                {user?.followers.length} followers
              </Typography>
            </Box>
          </Box>
        </Box>

        {session?.user?._id !== user?._id && (
          <Box>
            <Box className="button-wrapper">
              {currentUser?.followings?.some((u) => u._id === user?._id) ? (
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleFollow(
                      currentUser?.followings?.some((u) => u._id === user?._id)!
                    )
                  }
                >
                  <RemoveIcon />
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleFollow(
                      currentUser?.followings?.some((u) => u._id === user?._id)!
                    )
                  }
                >
                  <AddIcon />
                  Follow
                </Button>
              )}

              <Button variant="contained" sx={{ marginLeft: "15px" }}>
                <MessageIcon />
                Message
              </Button>
            </Box>

            <Button
              className="expand-btn"
              variant="outlined"
              sx={{ display: "none" }}
            >
              ...
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileDashboard;
