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
};

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const ModalPost = (props: IProps) => {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="modal-post">
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
              src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
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
              Cristiano Ronaldo
            </Typography>
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
            placeholder="What's on your mind, Cris ?"
            fullWidth
            sx={{ margin: "20px 0" }}
          />

          <label
            htmlFor="fileInput"
            className="upload-container"
            id="uploadContainer"
          >
            <CloudUploadIcon />
            <Typography>Upload image</Typography>
            <VisuallyHiddenInput type="file" id="fileInput" />
          </label>
          <Button variant="contained" sx={{ float: "right", marginTop: "20px" }}>
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPost;
