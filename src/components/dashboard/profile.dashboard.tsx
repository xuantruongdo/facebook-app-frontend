"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";

const ProfileDashboard = () => {
  return (
    <Box>
      <Box>
        <img
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0279bfa2ff61e2bd/60decd948aa56107a9510a9a/3de4c48f50b5b5262df927501658efc25a5118e6.jpg?auto=webp&format=pjpg&width=1080&quality=60"
          alt="cover"
          style={{
            width: "100%",
            height: "360px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
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
            src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
            alt="avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              sx={{ fontWeight: "bold", color: "#626262", fontSize: "24px" }}
            >
              Cristiano Ronaldo
            </Typography>
            <Typography
              sx={{ color: "#626262", fontSize: "12px", margin: "5px 0" }}
            >
              120 friends
            </Typography>
            <AvatarGroup sx={{ flexDirection: "row" }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Agnes Walker"
                src="/static/images/avatar/4.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
                sx={{ width: 30, height: 30 }}
              />
            </AvatarGroup>
          </Box>
        </Box>

        <Box>
          <Box className="button-wrapper">
          <Button variant="outlined">
            <AddIcon />
            Add Friend
          </Button>
          <Button variant="contained" sx={{ marginLeft: "15px" }}>
            <MessageIcon />
            Message
          </Button>
          </Box>

          <Button className="expand-btn" variant="outlined" sx={{display: "none"}}>...</Button>
        </Box>

      </Box>
    </Box>
  );
};

export default ProfileDashboard;
