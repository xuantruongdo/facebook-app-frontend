import ProfileDashboard from "@/components/dashboard/profile.dashboard";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Sidebar from "@/components/sidebar/profile.sidebar";
import Post from "@/components/post/app.post";
import Feed from "@/components/feed/app.feed";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { sendRequest } from "@/utils/api";

const ProfilePage = async (props: any) => {
  const session = await getServerSession(authOptions);

  const { params } = props;
  const temp = params?.slug?.split(".html") ?? [];
  const temp1 = temp[0]?.split("-") as string[];
  const id = temp1[temp1.length - 1];

  const res = await sendRequest<IBackendRes<IUser>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "GET",
  });

  const posts = await sendRequest<IBackendRes<IPost[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/author/${id}`,
    method: "GET",
  })

  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "84px",
      }}
    >
      <Container>
        <ProfileDashboard user={res?.data!} />
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
            {
              session?.user?._id === id && <Post />
            }
            
            <Feed posts={ posts?.data! } />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilePage;
