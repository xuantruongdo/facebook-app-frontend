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
import green from "@mui/material/colors/green";

const RightBar = () => {
  return (
    <Box
      sx={{
        padding: "10px",
        background: "white",
        borderRadius: "5px",
        marginTop: "20px",
        position: "sticky",
        top: "70px"
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
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <div
                          style={{
                            background: green[500],
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                          }}
                        />
                      }
                    >
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`/static/images/avatar/${value + 1}.jpg`}
                      />
                    </Badge>
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
