"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const RightBar = () => {
  return (
    <Box
      sx={{
        padding: "10px",
        background: "white",
        borderRadius: "5px",
        marginTop: "20px",
        position: "sticky",
        top: "70px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Events
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            See all
          </Typography>
        </Box>
        <Typography sx={{ margin: "15px", fontWeight: 500 }}>
          No data...
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Advertisement
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            Close
          </Typography>
        </Box>
        <img
          src="https://blog.authenticjourneys.info/wp-content/uploads/2016/10/gd-group-discussion-tips.jpg"
          alt="ads"
          style={{ width: "100%" }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ margin: "15px", fontWeight: "bold", color: "#626262" }}
          >
            Conversation
          </Typography>
          <Typography
            sx={{
              margin: "15px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
            }}
            color="primary"
          >
            Hide Chat
          </Typography>
        </Box>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} disablePadding>
                <ListItemButton>
                  <ListItemAvatar className="avatar">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
