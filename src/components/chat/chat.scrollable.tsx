"use client";

import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import ScrollableFeed from "react-scrollable-feed";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface IProps {
  messages: IMessage[];
}
const ScrollableChat = (props: IProps) => {
  const { messages } = props;
  const { data: session } = useSession();

  return (
    <ScrollableFeed>
      <Box sx={{ marginTop: "20px" }}>
        {messages?.map((m, i) => (
          <Box
            key={m?._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: `${
                m?.sender._id === session?.user?._id ? "flex-end" : "flex-start"
              }`,
            }}
          >
            {/* Avatar */}
            {m?.sender._id !== session?.user?._id && (
              <Tooltip title={m?.sender?.name}>
                <Avatar
                  alt={m?.sender?.name}
                  src={m?.sender?.avatar}
                  sx={{
                    margin: "10px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            )}

            {/* Name */}

            <Box>
              <Tooltip title={dayjs(m?.createdAt).fromNow()}>
                <Typography
                  sx={{
                    backgroundColor: `${
                      m.sender._id === session?.user?._id
                        ? "#BEE3F8"
                        : "#B9F5D0"
                    }`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "500px",
                    marginTop: "5px",
                  }}
                >
                  {m?.content}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
