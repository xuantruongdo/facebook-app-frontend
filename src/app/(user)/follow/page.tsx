import TabsFollow from "@/components/follow/tabs.follow";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const FollowPage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IUser>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${session?.user?._id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["follow-user"] },
    },
  });
  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "100vh",
        paddingTop: "84px",
      }}
    >
      <Container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TabsFollow user={res?.data!} />
      </Container>
    </div>
  );
};

export default FollowPage;
