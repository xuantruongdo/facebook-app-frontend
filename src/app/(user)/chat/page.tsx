import { Box } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { sendRequest } from "@/utils/api";
import ChatMain from "@/components/chat/main.chat";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat',
  description: "Social media website",
}

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
      next: { tags: ["access-chat"] },
    },
  });

  return (
    <Box
      sx={{
        background: "#EFEFEF",
        minHeight: "100vh",
        paddingTop: "84px",
      }}
    >
      <Box>
        <ChatMain myChats={chats?.data!} />
      </Box>
    </Box>
  );
};

export default ChatPage;
