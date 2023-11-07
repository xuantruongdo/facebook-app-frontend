"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ModalFeed from "./modal.feed";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);

interface IProps {
  posts: IPost[];
}
const Feed = (props: IProps) => {
  const { posts } = props;
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const [postView, setPostView] = React.useState<IPost>();
  const router = useRouter();

  const handleOpen = () => setOpen(true);

  const openView = (post: IPost) => {
    setPostView(post);
  };


  const handleLike = async (id: string) => {
    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/like/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      router.refresh();
    }
  };

  return (
    <>
      {posts?.map((post) => (
        <Box
          sx={{
            marginTop: "20px",
          }}
          key={post?._id}
        >
          <Box
            sx={{
              padding: "20px",
              background: "white",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box width="50px">
                <Link href={`/profile/${post?.author?._id}`}>
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
                <Typography
                  sx={{
                    marginLeft: "15px",
                    fontWeight: "bold",
                    color: "#626262",
                  }}
                >
                  {post?.author.name}
                </Typography>
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
              <Button onClick={() => handleLike(post?._id)}>
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

          <ModalFeed open={open} setOpen={setOpen} postView={postView!} setPostView={setPostView} openView={openView} />
        </Box>
      ))}
    </>
  );
};

export default Feed;
