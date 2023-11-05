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

const Feed = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        marginTop: "20px",
      }}
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
              sx={{ marginLeft: "15px", fontWeight: "bold", color: "#626262" }}
            >
              Cristiano Ronaldo
            </Typography>
            <Typography
              sx={{ marginLeft: "15px", fontSize: "12px", color: "#626262" }}
            >
              August 13 1999, 09.18 pm
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Typography sx={{ fontSize: "14px", color: "#696969" }}>
            Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Corporis
            Dolores Praesentium Dicta Laborum Nihil Accusantium Odit Laboriosam,
            Sed Sit Autem! #This_Post_is_Better!!!!
          </Typography>
          <img
            src="https://static-images.vnncdn.net/files/publish/2022/5/29/real-madrid-vs-liverpool-160.jpg"
            alt="pic"
            style={{ width: "100%", marginTop: "20px" }}
          />
        </Box>
        <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
          <Button>
            <Chip
              icon={<FavoriteIcon color="error" />}
              label="123"
              sx={{ cursor: "pointer" }}
            />
          </Button>
          <Button onClick={handleOpen}>
            <Chip
              icon={<CommentIcon />}
              label="10"
              sx={{ cursor: "pointer" }}
            />
          </Button>
        </Stack>
      </Box>

      <ModalFeed open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Feed;
