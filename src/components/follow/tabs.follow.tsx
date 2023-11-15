"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Followers from "./followers";
import Followings from "./followings";
import { useMediaQuery } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IProps {
  user: IUser;
}

const TabsFollow = (props: IProps) => {
  const { user } = props;
  const [value, setValue] = React.useState(0);
  const isMobileScreen = useMediaQuery("(max-width:900px)");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: `${isMobileScreen ? "90vw" : "40vw"}`, backgroundColor: "White", borderRadius: "5px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Followings" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Followers currentUser={user} followers={user?.followers} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Followings currentUser={user} followings={user?.followings} />
      </CustomTabPanel>
    </Box>
  );
};

export default TabsFollow;
