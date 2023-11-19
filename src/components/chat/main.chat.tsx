"use client";

import * as React from "react";
import { Box, Button, Drawer, useMediaQuery } from "@mui/material";
import MyChats from "./chat.mychats";
import ChatBox from "./chat.chatbox";

interface IProps {
  myChats: IChat[];
}
const ChatMain = (props: IProps) => {
  const { myChats } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const isScreen600 = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Box sx={{ margin: `${isScreen600 ? "0 5px 10px" : "0 50px 20px"}` }}>
        {isScreen900 && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Conversations
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "50px",
          margin: `${isScreen600 ? "0 10px" : "0 50px"}`,
        }}
      >
        {!isScreen900 && <MyChats myChats={myChats} />}

        <ChatBox />
      </Box>

      {isScreen900 && (
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
