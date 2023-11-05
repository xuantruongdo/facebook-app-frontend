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

const Info = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{ fontSize: "18px", fontWeight: "bold", color: "#626262" }}
      >
        Info{" "}
      </Typography>

      <Typography
        sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
      >
        I'm the GOAT{" "}
      </Typography>
      <Divider />
      <Box>
        <List>
          <ListItem disablePadding sx={{ padding: "5px 0" }}>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#696969" }}
              primary="Work at Al Nassr"
            />
          </ListItem>
          <ListItem disablePadding sx={{ padding: "5px 0" }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#696969" }}
              primary="Lives in Arab Saudi"
            />
          </ListItem>
          <ListItem disablePadding sx={{ padding: "5px 0" }}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#696969" }}
              primary="From Portugal"
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Info;
