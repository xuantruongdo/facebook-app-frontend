"use client";

import { Avatar, Button, Card, useMediaQuery } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import ModalSetting from "./modal.settings";

interface IProps {
  user: IUser;
}
const Setting = (props: IProps) => {
  const { user } = props;
  const [open, setOpen] = useState<boolean>(false);
  const isScreen600 = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Card sx={{ width: isScreen600 ? "95vw" : "50vw", backgroundColor: "white" }} className="modal-chat">
        <Button
          variant="contained"
          sx={{ margin: "20px" }}
          onClick={() => setOpen(true)}
        >
          Update
        </Button>
        <List sx={{ margin: "0 20px" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar src={user?.avatar} alt={user?.name} />
              </ListItemIcon>
              <ListItemText primary={user?.name} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={`Email: ${user?.email}`} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={`Note: ${user?.note ? user?.note : ""}`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Work at: ${user?.work ? user?.work : ""}`}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Lives in: ${user?.live ? user?.live : ""}`}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={`From: ${user?.from ? user?.from : ""}`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
      <ModalSetting open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export default Setting;
