"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VerifiedIcon from "@mui/icons-material/Verified";
import ModalFeed from "./modal.feed";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { convertSlugUrl, sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useUserContext } from "@/app/lib/user.context";
import { notifyError, notifySuccess } from "@/app/logic/logic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ListItemButton, Popover } from "@mui/material";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ModalUpdate from "./modal.update";

interface IProps {
  posts: IPost[];
}
const Feed = (props: IProps) => {
  const { posts } = props;
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = React.useState<boolean>(false);
  const [postView, setPostView] = React.useState<IPost>();
  const router = useRouter();
  const { socket, setSocket } = useUserContext() as IUserContext;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);

  const handleOpen = () => setOpen(true);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    post: IPost
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const openView = (post: IPost) => {
    setPostView(post);
  };

  const handleLike = async (id: string, isLike: boolean) => {
    try {
      const res = await sendRequest<IBackendRes<IPost>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/like/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (res && res.data) {
        router.refresh();
        if (!isLike && res?.data?.author?._id !== session?.user?._id) {
          socket?.emit("like", {
            sender: session?.user,
            post: res?.data,
            type: "like",
            createdAt: new Date(),
          });
        }
      } else {
        notifyError(res?.message);
      }
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };

  const handleDelete = async (post: IPost) => {
    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/${post?._id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      router.refresh();
      notifySuccess("Delete a post successfully");
      handlePopoverClose();
    } else {
      notifyError(res?.message);
    }
  };

  return (
    <>
      {posts?.map((post) => (
        <Box key={post?._id}>
          <Box
            sx={{
              padding: "20px",
              background: "white",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box width="50px">
                  <Link
                    href={`/profile/${convertSlugUrl(post?.author?.name!)}-${
                      post?.author?._id
                    }.html`}
                  >
                    <img
                      src={post?.author.avatar}
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Link
                      href={`/profile/${convertSlugUrl(post?.author?.name!)}-${
                        post?.author?._id
                      }.html`}
                    >
                      <Typography
                        sx={{
                          marginLeft: "15px",
                          fontWeight: "bold",
                          color: "#626262",
                        }}
                      >
                        {post?.author?.name}
                      </Typography>
                    </Link>

                    {post?.author?.isActive && (
                      <VerifiedIcon color="primary" sx={{ fontSize: "16px" }} />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: "12px",
                      color: "#626262",
                    }}
                  >
                    {dayjs(post?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>

              {session?.user?._id === post?.author?._id && (
                <>
                  <Button
                    aria-describedby={post?._id}
                    onClick={(event) => handlePopoverOpen(event, post)}
                  >
                    <MoreHorizIcon />
                  </Button>
                  <Popover
                    id={post?._id}
                    open={Boolean(anchorEl && selectedPost?._id === post._id)}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      sx: {
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Điều chỉnh giá trị box shadow tại đây
                      },
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setOpenModalUpdate(true);
                            handlePopoverClose();
                            openView(post);
                          }}
                        >
                          <ListItemIcon>
                            <BrowserUpdatedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Update" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleDelete(post)}>
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText primary="Delete" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Popover>
                </>
              )}
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <Typography sx={{ fontSize: "14px", color: "#696969" }}>
                {post.content}
              </Typography>
              {post?.image ? (
                <img
                  src={post?.image}
                  alt="pic"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={() => {
                    openView(post);
                    handleOpen();
                  }}
                />
              ) : (
                <></>
              )}
            </Box>
            <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
              <Button
                onClick={() =>
                  handleLike(
                    post?._id,
                    post?.likes?.some((t) => t._id === session?.user?._id)
                  )
                }
              >
                <Chip
                  icon={
                    <FavoriteIcon
                      color={`${
                        post?.likes?.some((t) => t._id === session?.user?._id)
                          ? "error"
                          : "disabled"
                      }`}
                    />
                  }
                  label={post?.likes.length}
                  sx={{ cursor: "pointer" }}
                />
              </Button>
              <Button
                onClick={() => {
                  openView(post);
                  handleOpen();
                }}
              >
                <Chip
                  icon={<CommentIcon />}
                  label={post?.comments.length}
                  sx={{ cursor: "pointer" }}
                />
              </Button>
            </Stack>
          </Box>

          <ModalFeed
            open={open}
            setOpen={setOpen}
            postView={postView!}
            setPostView={setPostView}
            openView={openView}
          />
          <ModalUpdate
            openModalUpdate={openModalUpdate}
            setOpenModalUpdate={setOpenModalUpdate}
            postView={postView!}
            setPostView={setPostView}
          />
        </Box>
      ))}
    </>
  );
};

export default Feed;
