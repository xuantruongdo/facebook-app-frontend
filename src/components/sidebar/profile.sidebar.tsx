'use client'

import Box from "@mui/material/Box";
import Info from "./info.sidebar";
import Photo from "./photo.sidebar";
import Friend from "./friend.sidebar";
import { useMediaQuery } from "@mui/material";

interface IProps {
  user: IUser;
  posts: IPost[];
}

const Sidebar = (props: IProps) => {
  const isScreen900 = useMediaQuery("(max-width:900px)");

  const { user, posts } = props;
  return (
    <Box sx={{ display: isScreen900 ? "none" : "block"}}>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          position: "sticky",
          top: "70px",
        }}
      >
        <Info user={user} type="pc" />
        <Photo user={user} posts={posts} type="pc" />
        {/* <Friend/> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
