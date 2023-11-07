"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import { useSession } from "next-auth/react";

const ProfileDashboard = () => {
  const { data: session } = useSession();

  return (
    <Box>
      <Box sx={{ width: "100%", height: "360px", background: "#aaa" }}>
        {session?.user?.cover ? (
          <img
            src={session?.user?.cover}
            alt="cover"
            style={{
              width: "100%",
              height: "360px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          ""
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
            src={session?.user?.avatar}
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
                {session?.user?.name}
              </Typography>
              {/* <svg
                viewBox="0 0 12 13"
                width="1em"
                height="1em"
                fill="currentColor"
                style={{ color: "#0866FF" }}
                className="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj xlup9mm x1kky2od"
              >
                <title>Tài khoản đã xác minh</title>
                <g fill-rule="evenodd" transform="translate(-98 -917)">
                  <path d="m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819"></path>
                </g>
              </svg> */}
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

          <Button
            className="expand-btn"
            variant="outlined"
            sx={{ display: "none" }}
          >
            ...
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDashboard;
