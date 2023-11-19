"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import VerifiedIcon from "@mui/icons-material/Verified";
import { isValidContent, notifyError, notifySuccess } from "@/app/logic/logic";
import { Skeleton, useMediaQuery } from "@mui/material";

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

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const ModalPost = (props: IProps) => {
  const isScreen400 = useMediaQuery("(max-width:400px)");
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const style = {
    position: "absolute" as "absolute",
    top: isScreen400 ? "55%" : "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isScreen400 ? "90%" : isScreen900 ? "80%" : "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };

  const { data: session } = useSession();
  const { open, setOpen } = props;
  const [content, setContent] = React.useState<string>("");
  const [pic, setPic] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>();
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleUpload = (pics: any) => {
    setLoading(true);
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
          setLoading(false);
          setPic(data.url);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }
  };

  const handlePost = async () => {
    if (!isValidContent(content)) {
      notifyError("Please fill in the post content");
      return;
    }

    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`,
      method: "POST",
      body: {
        content: content,
        image: pic,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      setContent("");
      setPic("");
      notifySuccess("Posted successfully");
      handleClose();
      router.refresh();
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Create a post
        </Typography>
        <Divider />

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <Box width="50px">
            <img
              src={session?.user?.avatar}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography
                sx={{
                  marginLeft: "15px",
                  fontWeight: "bold",
                  color: "#626262",
                }}
              >
                {session?.user?.name}
              </Typography>
              {session?.user?.isActive && (
                <VerifiedIcon color="primary" sx={{ fontSize: "16px" }} />
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ marginLeft: "15px", fontSize: "12px", color: "#626262" }}
              >
                Public
              </Typography>
              <KeyboardArrowDownIcon />
            </Box>
          </Box>
        </Box>

        <Box>
          <TextField
            variant="standard"
            placeholder={`What's on your mind, ${session?.user?.name} ?`}
            fullWidth
            sx={{ margin: "20px 0" }}
            onChange={(e) => setContent(e.target.value)}
          />

          {pic && !loading && (
            <Box
              sx={{
                width: "100%",
                height: "400px",
                position: "relative",
              }}
            >
              <img
                src={pic}
                alt="pic"
                style={{ width: "100%", height: "400px", objectFit: "contain" }}
              />
              <Button
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setPic(undefined);
                }}
              >
                x
              </Button>
            </Box>
          )}
          {!pic && !loading && (
            <label
              htmlFor="fileInput"
              className="upload-container"
              id="uploadContainer"
            >
              <CloudUploadIcon />
              <Typography>Upload image</Typography>
              <VisuallyHiddenInput
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={(e) => {
                  if (!e.target.files) return;
                  handleUpload(e.target.files[0]);
                }}
              />
            </label>
          )}
          {loading && (
            <Skeleton
              animation="wave"
              height={400}
              style={{ marginBottom: 6 }}
            />
          )}
          <Button
            variant="contained"
            sx={{ float: "right", marginTop: "20px" }}
            onClick={handlePost}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPost;
