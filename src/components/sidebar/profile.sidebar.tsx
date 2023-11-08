import Box from "@mui/material/Box";
import Info from "./info.sidebar";
import Photo from "./photo.sidebar";
import Friend from "./friend.sidebar";

interface IProps{
  user: IUser
}

const Sidebar = (props: IProps) => {
  const { user } = props;
  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column", position: "sticky", top: "70px" }} className="sidebar">
      <Info user={user} />
      <Photo/>
      <Friend/>
    </Box>
  );
};

export default Sidebar;
