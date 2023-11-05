import Box from "@mui/material/Box";
import LeftBar from "@/components/leftbar/app.leftbar";
import RightBar from "@/components/rightbar/app.rightbar";
import Post from "@/components/post/app.post";
import Feed from "@/components/feed/app.feed";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <Box
      sx={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "64px",
      }}
    >
      <Box sx={{ display: "flex", gap: "20px", margin: "0 50px" }} className={"home-container"}>
        <Grid container spacing={2}>
          <Grid item md={3} className="left-bar">
            <LeftBar />
          </Grid>
          <Grid item md={6}>
            <Post />
            <Feed />
          </Grid>
          <Grid item md={3} className="right-bar">
            <RightBar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
