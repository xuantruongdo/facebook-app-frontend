"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
  borderRadius: "5px",
};

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  postView: IPost;
  openView: (v: IPost) => void;
  setPostView: (v: IPost) => void;
}

const ModalFeed = (props: IProps) => {
  const { data: session } = useSession();
  const { open, setOpen, postView, setPostView, openView } = props;
  const router = useRouter();
  const [content, setContent] = React.useState<string>("");

  const handleClose = () => setOpen(false);

  const handleSubmit = async (id: string) => {
    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${id}`,
      method: "POST",
      body: {
        content: content,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      router.refresh();
      setPostView(res.data);
      setContent("");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="modal-pic">
        <Box>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{
                padding: "10px",
                display: `${postView?.image ? "block" : "none"}`,
              }}
            >
              {postView?.image ? (
                <img
                  src={postView?.image}
                  alt="pic"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} sm={postView?.image ? 4 : 12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box width="50px">
                  <img
                    src={postView?.author?.avatar}
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontWeight: "bold",
                      color: "#626262",
                    }}
                  >
                    {postView?.author?.name}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: "12px",
                      color: "#626262",
                    }}
                  >
                    {dayjs(postView?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  margin: "20px 5px 20px 0",
                  color: "#626262",
                }}
              >
                {postView?.content}
              </Typography>
              <Box sx={{ margin: "10px 0 20px", display: "flex", gap: "20px" }}>
                <Chip
                  icon={<FavoriteIcon color="error" />}
                  label="Like"
                  sx={{ cursor: "pointer" }}
                />
                <Chip
                  icon={<CommentIcon />}
                  label="Comment"
                  sx={{ cursor: "pointer" }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={session?.user?.avatar}
                  alt="avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(postView?._id);
                    }
                  }}
                />
              </Box>

              <List
                sx={{ overflow: "auto", height: "300px" }}
                className="list-cmt"
              >
                {postView?.comments?.map((cmt) => (
                  <Box sx={{ marginTop: "20px" }} key={cmt?._id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <img
                        src={cmt?.user?.avatar}
                        alt="avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {cmt?.user?.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "50px" }}>
                          <Typography sx={{ fontSize: "12px" }}>
                            {cmt?.content}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {dayjs(cmt?.createdAt).fromNow()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFeed;
