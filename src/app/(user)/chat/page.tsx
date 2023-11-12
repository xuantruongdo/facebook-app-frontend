import ChatBox from "@/components/chat/chat.chatbox";
import MyChats from "@/components/chat/chat.mychats";
import { Box } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { sendRequest } from "@/utils/api";

const ChatPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
      redirect("/");
  }

  const chats = await sendRequest<IBackendRes<IChat[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: {tags: ['access-chat']}
    }
  })

  return (
    <Box
      sx={{
        background: "#EFEFEF",
        minHeight: "100vh",
        paddingTop: "84px",
      }}
    >
      <Box sx={{ display: "flex", gap: "50px", margin: "0 50px" }}>
        <MyChats myChats={chats?.data!}/>
        <ChatBox />
      </Box>
    </Box>
  );
};

export default ChatPage;
