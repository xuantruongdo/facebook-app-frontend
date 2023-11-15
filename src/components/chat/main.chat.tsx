"use client";

import * as React from "react";
import { Box, Button, Drawer, Typography, useMediaQuery } from "@mui/material";
import MyChats from "./chat.mychats";
import ChatBox from "./chat.chatbox";

interface IProps {
  myChats: IChat[];
}
const ChatMain = (props: IProps) => {
  const { myChats } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const isMobileScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Box sx={{ margin: `${isMobileScreen ? "0 5px 10px" : "0 50px 20px"}` }}>
        {isSmallScreen && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Conversations
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "50px",
          margin: `${isMobileScreen ? "0 10px" : "0 50px"}`,
        }}
      >
        {!isSmallScreen && <MyChats myChats={myChats} />}

        <ChatBox />
      </Box>

      {isSmallScreen && (
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <Box sx={{ width: "350px", overflow: "auto" }}>
            <Button onClick={() => setOpen(false)}>
              x
            </Button>
            <MyChats myChats={myChats} />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default ChatMain;
