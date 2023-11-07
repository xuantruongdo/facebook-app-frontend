import ProfileDashboard from "@/components/dashboard/profile.dashboard";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Sidebar from "@/components/sidebar/profile.sidebar";
import Post from "@/components/post/app.post";
import Feed from "@/components/feed/app.feed";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
      redirect("/");
  }
  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "84px",
      }}
    >
      <Container>
        <ProfileDashboard />
        <Grid
          container
          sx={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "nowrap",
            gap: "50px",
          }}
          className="profile-wrapper"
        >
          <Grid item xs={0} md={4}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={8}>
            <Post />
            {/* <Feed/> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilePage;
