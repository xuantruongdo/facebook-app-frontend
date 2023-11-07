"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MoodIcon from "@mui/icons-material/Mood";
import ModalPost from "./modal.post";
import { useSession } from "next-auth/react";

const Post = () => {
  const { data: session } = useSession();

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  
  return (
    <Box
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold", color: "#626262" }}
          >
            {session?.user?.name}
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
      <Box sx={{ margin: "30px 0 0 50px" }}>
        <TextField
          variant="standard"
          placeholder={`What's on your mind, ${session?.user?.name} ?`}
          fullWidth
          onClick={handleOpen}
        />
        <Box sx={{ marginTop: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ListItemButton>
                <ListItemIcon>
                  <VideoCallIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Live Video" />
              </ListItemButton>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                  <AddAPhotoIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Photo/Video" />
              </ListItemButton>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItemButton>
                <ListItemIcon>
                  <MoodIcon color="warning" />
                </ListItemIcon>
                <ListItemText primary="Feeling Activity" />
              </ListItemButton>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ModalPost open={open} setOpen={setOpen}/>
    </Box>
  );
};

export default Post;
