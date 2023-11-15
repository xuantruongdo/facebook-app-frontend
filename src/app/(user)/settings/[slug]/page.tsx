import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { sendRequest } from "@/utils/api";
import Container from "@mui/material/Container";
import Setting from "@/components/settings/setting";

const SettingPage = async (props: any) => {
  const { params } = props;
  const session = await getServerSession(authOptions);
  if (session?.user?._id !== params?.slug) {
    redirect("/");
  }

  const user = await sendRequest<IBackendRes<IUser>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${params?.slug}`,
    method: "GET",
    nextOption: {
      next: { tags: ["follow-user"] },
    },
  });

  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "84px",
      }}
    >
      <Container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Setting user={user?.data!} />
      </Container>
    </div>
  );
};

export default SettingPage;
