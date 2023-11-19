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
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  postView: IPost;
  setPostView: (v: IPost) => void;
}
const ModalUpdate = (props: IProps) => {
  const isScreenMin900 = useMediaQuery("(min-width:900px)");
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const isScreen600 = useMediaQuery("(max-width:600px)");
  const isScreen400 = useMediaQuery("(max-width:600px)");
  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isScreen400 ? "90%" : isScreen600 ? "80%" : isScreen900 ? "80%" : isScreenMin900 ? "40%" : "",
    height: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "auto",
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };

  const { data: session } = useSession();
  const { openModalUpdate, setOpenModalUpdate, postView, setPostView } = props;
  const [content, setContent] = React.useState<string>(postView?.content || "");
  const [pic, setPic] = React.useState<string>();
  const [isChangeImage, setIsChangeImage] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>();
  const router = useRouter();

  const handleClose = () => {
    setOpenModalUpdate(false);
    setIsChangeImage(false);
    setPic("");
  };

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

  const handleUpdatePost = async () => {
    if (!isValidContent(content)) {
      notifyError("Please fill in the post content");
      return;
    }

    const res = await sendRequest<IBackendRes<IPost>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/${postView?._id}`,
      method: "PATCH",
      body: pic
        ? {
            content: content,
            image: pic,
          }
        : {
            content: content,
          },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      setContent("");
      setPic("");
      notifySuccess("Updated post successfully");
      handleClose();
      router.refresh();
    }
  };

  const renderImageBox = (src: string) => (
    <Box
      sx={{
        width: "100%",
        height: "max-content",
        position: "relative",
      }}
    >
      <img
        src={src}
        alt="image"
        style={{ width: "100%", height: "270px", objectFit: "contain" }}
      />
      <Button
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          fontWeight: "bold",
        }}
        onClick={() => {
          setIsChangeImage(true);
          setPic("");
        }}
      >
        x
      </Button>
    </Box>
  );

  const renderUploadLabel = () => (
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
  );

  React.useEffect(() => {
    setContent(postView?.content || "");
  }, [postView]);

  return (
    <Modal open={openModalUpdate} onClose={handleClose}>
      <Box sx={style} className="modal-post">
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Update a post
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {!pic &&
            !isChangeImage &&
            postView?.image &&
            renderImageBox(postView?.image)}

          {isChangeImage && !pic && !loading && renderUploadLabel()}

          {isChangeImage && pic && renderImageBox(pic)}

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
            onClick={handleUpdatePost}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdate;
