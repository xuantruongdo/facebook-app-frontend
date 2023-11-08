"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useSession } from "next-auth/react";
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
  user: IUser;
}
const ProfileDashboard = (props: IProps) => {
  const { user } = props;
  const { data: session } = useSession();

  return (
    <Box>
      <Box sx={{ width: "100%", height: "360px", background: "#aaa" }}>
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
            src={user?.avatar}
            alt="avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ marginLeft: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography
                sx={{ fontWeight: "bold", color: "#626262", fontSize: "24px" }}
              >
                {user?.name}
              </Typography>
              {user?.isActive && <VerifiedIcon color="primary" />}
            </Box>

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

        {session?.user?._id !== user?._id && (
          <Box>
            <Box className="button-wrapper">
              <Button variant="outlined">
                <AddIcon />
                Follow
              </Button>
              <Button variant="outlined">
                <RemoveIcon />
                Unfollow
              </Button>
              <Button variant="contained" sx={{ marginLeft: "15px" }}>
                <MessageIcon />
                Message
              </Button>
            </Box>

            <Button
              className="expand-btn"
              variant="outlined"
              sx={{ display: "none" }}
            >
              ...
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileDashboard;
