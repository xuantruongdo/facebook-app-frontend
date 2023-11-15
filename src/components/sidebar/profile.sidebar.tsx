import Box from "@mui/material/Box";
import Info from "./info.sidebar";
import Photo from "./photo.sidebar";
import Friend from "./friend.sidebar";

interface IProps{
  user: IUser;
  posts: IPost[]
}

const Sidebar = (props: IProps) => {
  const { user, posts } = props;
  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column", position: "sticky", top: "70px" }} className="sidebar">
      <Info user={user} type="pc"/>
      <Photo user={user} posts={posts} type="pc" />
      {/* <Friend/> */}
    </Box>
  );
};

export default Sidebar;
