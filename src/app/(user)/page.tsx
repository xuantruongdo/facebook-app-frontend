import Box from "@mui/material/Box";
import LeftBar from "@/components/leftbar/app.leftbar";
import RightBar from "@/components/rightbar/app.rightbar";
import Post from "@/components/post/app.post";
import Feed from "@/components/feed/app.feed";
import Grid from "@mui/material/Grid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { sendRequest } from "@/utils/api";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await sendRequest<IBackendRes<IPost[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`,
    method: "GET",
  });

  return (
    <Box
      sx={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "64px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          margin: "0 50px",
          "@media (max-width: 900px)": {
            margin: "0 10px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={3} className="left-bar">
            <LeftBar />
          </Grid>
          <Grid item md={6} sx={{ marginTop: "20px" }}>
            <Post />
            <Feed posts={posts?.data!} />
          </Grid>
          <Grid item md={3} className="right-bar">
            <RightBar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
