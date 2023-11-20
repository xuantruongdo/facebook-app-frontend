import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Link from "next/link";

interface IProps {
  user: IUser;
  type: string;
}

const Info = (props: IProps) => {
  const { user, type } = props;

  return (
    <Box
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "5px",
      }}
    >
      {type === "pc" && (
        <Box>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "bold", color: "#626262" }}
          >
            Info
          </Typography>

          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            {user?.note}
          </Typography>
          <Divider />
        </Box>
      )}

      <Box>
        <List>
          {user?.work && (
            <ListItem disablePadding sx={{ padding: "5px 0" }}>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText
                style={{ color: "#696969" }}
                primary={`Work at ${user?.work}`}
              />
            </ListItem>
          )}

          {user?.live && (
            <ListItem disablePadding sx={{ padding: "5px 0" }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                style={{ color: "#696969" }}
                primary={`Lives in ${user?.live}`}
              />
            </ListItem>
          )}

          {user?.from && (
            <ListItem disablePadding sx={{ padding: "5px 0" }}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                style={{ color: "#696969" }}
                primary={`From ${user?.from}`}
              />
            </ListItem>
          )}

          {user?.followings && (
            <ListItem disablePadding sx={{ padding: "5px 0" }}>
              <ListItemIcon>
                <RssFeedIcon />
              </ListItemIcon>
              <ListItemText
                style={{ color: "#696969" }}
                primary={`${user?.followings.length} followings`}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Info;
