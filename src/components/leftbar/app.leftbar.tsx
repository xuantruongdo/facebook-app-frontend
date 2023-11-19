"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IProps {
  open?: boolean;
  setOpen?: (v: boolean) => void;
}
const LeftBar = (props: IProps) => {
  const { open, setOpen } = props;
  const router = useRouter();
  return (
    <Box sx={{ position: "sticky", top: "70px" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push("/");
              if (setOpen) {
                setOpen(false);
              }
            }}
          >
            <ListItemIcon>
              <FeedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="News Feed" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link href={"/follow"} style={{ width: "100%" }}>
            <ListItemButton
              onClick={() => {
                router.push("/");
                if (setOpen) {
                  setOpen(false);
                }
              }}
            >
              <ListItemIcon>
                <PeopleAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Marketplace" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LiveTvIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Watch" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography color="primary">See more</Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography sx={{ margin: "15px", fontSize: "20px" }}>
            Your shortcut
          </Typography>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <img
              alt="Random image"
              src="https://images.careerbuilder.vn/content/images/developer-la-gi-CareerBuilder-2.jpg"
              width={50}
              height={50}
              style={{
                objectFit: "cover",
              }}
            />
            <ListItemText
              primary="Web Developers"
              sx={{ marginLeft: "20px" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <img
              alt="Random image"
              src="https://images.careerbuilder.vn/content/images/developer-la-gi-CareerBuilder-1.jpg"
              width={50}
              height={50}
              style={{
                objectFit: "cover",
              }}
            />
            <ListItemText
              primary="Web Design Course"
              sx={{ marginLeft: "20px" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <img
              alt="Random image"
              src="https://images.careerbuilder.vn/content/images/developer-la-gi-CareerBuilder-10.jpg"
              width={50}
              height={50}
              style={{
                objectFit: "cover",
              }}
            />
            <ListItemText
              primary="Full Stack Development
              "
              sx={{ marginLeft: "20px" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <img
              alt="Random image"
              src="https://images.careerbuilder.vn/content/images/developer-la-gi-CareerBuilder-7.png"
              width={50}
              height={50}
              style={{
                objectFit: "cover",
              }}
            />
            <ListItemText
              primary="Website Experts"
              sx={{ marginLeft: "20px" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftBar;
