import Box from "@mui/material/Box";
import Info from "./info.sidebar";
import Photo from "./photo.sidebar";
import Friend from "./friend.sidebar";


const Sidebar = () => {
  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column", position: "sticky", top: "70px" }} className="sidebar">
      <Info/>
      <Photo/>
      <Friend/>
    </Box>
  );
};

export default Sidebar;
