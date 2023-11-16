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
import { notifyError, notifySuccess } from "@/app/logic/logic";
import { useChatContext } from "@/app/lib/chat.context";
import { Menu, MenuItem, Modal, styled } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Link from "next/link";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  outline: "none",
};

interface IProps {
  user: IUser;
}
const ProfileDashboard = (props: IProps) => {
  const { user } = props;
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const inputRefAvatar = React.useRef<HTMLInputElement>(null);
  const inputRefCover = React.useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = React.useState<string>();
  const [openModalAvatar, setOpenModalAvatar] = React.useState<boolean>(false);
  const [cover, setCover] = React.useState<string>();
  const [openModalCover, setOpenModalCover] = React.useState<boolean>(false);
  const { socket, setSocket } = useUserContext() as IUserContext;
  const router = useRouter();
  const { chats, setChats, selectedChat, setSelectedChat } =
    useChatContext() as IChatContext;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
          post: { author: user },
          type: "follow",
          createdAt: new Date(),
        });
      }
    } else {
      notifyError(res?.message);
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
      router.refresh();
      router.push("/chat");
      setSelectedChat(res.data);
    } else {
      notifyError(res?.message);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {currentUser?.followings?.some((u) => u._id === user?._id) ? (
        <MenuItem>
          <Button
            sx={{ width: "150px" }}
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
        </MenuItem>
      ) : (
        <MenuItem>
          <Button
            sx={{ width: "150px" }}
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
        </MenuItem>
      )}

      <MenuItem>
        <Button
          sx={{ width: "150px" }}
          variant="contained"
          onClick={() => handleAccess(user?._id)}
        >
          <MessageIcon />
          Message
        </Button>
      </MenuItem>
    </Menu>
  );

  const handleUpload = (pics: any, type: string) => {
    //@ts-ignore
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "xuantruongdo");
      fetch("https://api.cloudinary.com/v1_1/xuantruongdo/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (type === "avatar") {
            setAvatar(data.url);
            setOpenModalAvatar(true);
          }
          if (type === "cover") {
            setCover(data.url);
            setOpenModalCover(true);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }
  };

  const handleSaveAvatar = async () => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${user?._id}`,
      method: "PATCH",
      body: {
        avatar: avatar,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      notifySuccess("Updated avatar successfully");
      router.refresh();
      setOpenModalAvatar(false);
      setAvatar("");
    } else {
      notifyError(res?.message);
    }
  };

  const handleSaveCover = async () => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${user?._id}`,
      method: "PATCH",
      body: {
        cover: cover,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      notifySuccess("Updated cover successfully");
      router.refresh();
      setOpenModalCover(false);
      setCover("");
    } else {
      notifyError(res?.message);
    }
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "360px",
            background: "#aaa",
            position: "relative",
          }}
        >
          <>
            {session?.user?._id === user?._id && (
              <>
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

                <Box
                  sx={{
                    background: "#3A3B3C",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                  onClick={() => {
                    if (inputRefCover.current) {
                      inputRefCover.current.click();
                    }
                  }}
                >
                  <CameraAltIcon />
                </Box>
              </>
            )}

            <VisuallyHiddenInput
              type="file"
              style={{ display: "none" }}
              ref={inputRefCover}
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;
                handleUpload(e.target.files[0], "cover");
              }}
            />
          </>
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
            <Box sx={{ position: "relative" }}>
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
              {session?.user?._id === user?._id && (
                <>
                  <Box
                    sx={{
                      background: "#3A3B3C",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                    onClick={() => {
                      if (inputRefAvatar.current) {
                        inputRefAvatar.current.click();
                      }
                    }}
                  >
                    <CameraAltIcon />
                  </Box>
                  <VisuallyHiddenInput
                    type="file"
                    style={{ display: "none" }}
                    ref={inputRefAvatar}
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      handleUpload(e.target.files[0], "avatar");
                    }}
                  />
                </>
              )}
            </Box>

            <Box sx={{ marginLeft: "20px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#626262",
                    fontSize: "24px",
                  }}
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
                <Link href={"/follow"}>
                  <Typography sx={{ fontSize: "12px", margin: "5px 0" }}>
                    {user?.followers.length} followers
                  </Typography>
                </Link>
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
                        currentUser?.followings?.some(
                          (u) => u._id === user?._id
                        )!
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
                        currentUser?.followings?.some(
                          (u) => u._id === user?._id
                        )!
                      )
                    }
                  >
                    <AddIcon />
                    Follow
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{ marginLeft: "15px" }}
                  onClick={() => handleAccess(user?._id)}
                >
                  <MessageIcon />
                  Message
                </Button>
              </Box>

              <Button
                className="expand-btn"
                variant="outlined"
                sx={{ display: "none" }}
                onClick={(e) => handleOpen(e)}
              >
                ...
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {renderMenu}

      <Modal open={openModalAvatar} onClose={() => setOpenModalAvatar(false)}>
        <Box sx={style}>
          <img
            src={avatar}
            alt="avatar"
            style={{ width: "100%", objectFit: "cover" }}
          />
          <Button
            variant="contained"
            sx={{ float: "right" }}
            onClick={handleSaveAvatar}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Modal open={openModalCover} onClose={() => setOpenModalCover(false)}>
        <Box sx={style}>
          <img
            src={cover}
            alt="cover"
            style={{ width: "100%", objectFit: "cover" }}
          />
          <Button
            variant="contained"
            sx={{ float: "right" }}
            onClick={handleSaveCover}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileDashboard;
