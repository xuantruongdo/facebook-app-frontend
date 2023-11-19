"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Info from "../sidebar/info.sidebar";
import Photo from "../sidebar/photo.sidebar";
import { useMediaQuery } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IProps{
    user: IUser;
    posts: IPost[]
  }

const TabsProfile = (props: IProps) => {
    const { user, posts } = props;
  const [value, setValue] = React.useState(0);
    const isScreen900 = useMediaQuery("(max-width:900px)");
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", backgroundColor: "white", marginTop: "20px", display: isScreen900 ? "block" : "none" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label="Information" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Info user={user} type="mobile"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Photo user={user} posts={posts} type="mobile"/>
      </CustomTabPanel>
    </Box>
  );
};

export default TabsProfile;
