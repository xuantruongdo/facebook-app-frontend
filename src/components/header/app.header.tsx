"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { useRouter } from "next/navigation";
import { convertSlugUrl } from "@/utils/api";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Button, ListItemSecondaryAction } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useUserContext } from "@/app/lib/user.context";
import { useHasMounted } from "@/utils/customHook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import io, { Socket } from "socket.io-client";
const ENDPOINT = "http://localhost:8002";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function AppHeader() {
  const { data: session } = useSession();

  const { onlineUsers, setOnlineUsers } = useUserContext() as IUserContext;

  if (session && session.error === "RefreshAccessTokenError") {
    // Session đã được kiểm tra và có lỗi, thực hiện xử lý tại đây
    // Ví dụ: Chuyển về trang đăng nhập và đặt session thành null

    // Sử dụng next/router để chuyển hướng đến trang đăng nhập
    const router = useRouter();
    router.push("/login");

    // Đặt session thành null
    signOut({ callbackUrl: "/auth/signin" });
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const hasMounted = useHasMounted();
  const [socket, setSocket] = React.useState<Socket>();
  const [notifications, setNotifications] = React.useState<
    INotification[] | []
  >([]);

  React.useEffect(() => {
    if (session) {
      const newSocket = io(ENDPOINT, {
        query: { userId: session?.user._id },
      });
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [session]);

  React.useEffect(() => {
    socket?.on("onlineUsers", (usersArray) => {
      setOnlineUsers(usersArray); // Update state with the received online users
    });

    socket?.on(`noti_${session?.user?._id}`, (notification) => {
      if (!hasMounted) return <></>;
      setNotifications((prev: any) => [notification, ...prev]);

      // if (notification?.post?.author?._id === session?.user?._id) {
      //   setNotifications((prev: any) => [notification, ...prev]);
      // }
    });

    //@ts-ignore
    socket?.emit("getOnlineUsers", session?.id);
  }, [socket, session]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCloseNoti = () => {
    setNotiAnchorEl(null);
  };

  const handleOpenNoti = (event: React.MouseEvent<HTMLElement>) => {
    setNotiAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    handleMenuClose;
    signOut();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          width: "250px", // Đặt chiều rộng theo nhu cầu của bạn
        },
      }}
    >
      <Link
        href={`/profile/${convertSlugUrl(session?.user?.name!)}-${
          session?.user._id
        }.html`}
        onClick={handleMenuClose}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Avatar alt="avatar" src={session?.user?.avatar} />
            </ListItemIcon>
            <ListItemText primary={session?.user?.name} />
            {session?.user?.isActive && (
              <ListItemSecondaryAction>
                <VerifiedIcon color="primary" />
              </ListItemSecondaryAction>
            )}
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <BrowserUpdatedIcon />
          </ListItemIcon>
          <ListItemText primary="Update" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={logout}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <GroupIcon />
          </Badge>
        </IconButton>
        <p>Friends</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MessageIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderNotification = (
    <Menu
      anchorEl={notiAnchorEl}
      open={Boolean(notiAnchorEl)}
      onClose={handleCloseNoti}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: "400px", // Đặt chiều rộng theo nhu cầu của bạn
        },
      }}
    >
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {notifications.length > 0 ? (
          notifications?.map((noti, index) => (
            <ListItem key={index} alignItems="center" disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={noti?.sender?.name} src={noti?.sender?.avatar} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ width: "100px" }}
                  primary={noti?.message}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "block",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        component="span"
                        variant="body2"
                        color="#555555"
                      >
                        {noti?.post?.content}
                      </Typography>

                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: "12px",
                        }}
                        component="span"
                      >
                        {dayjs(noti?.createdAt).fromNow()}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {
                  noti?.type === "like" && <FavoriteIcon color="error" />
                }
                {
                  noti?.type === "comment" && <CommentIcon color="success"/>
                }
                {
                  noti?.type === "follow" && <RssFeedIcon color="primary"/>
                }
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography sx={{textAlign: 'center'}}>No data...</Typography>
        )}
      </List>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button variant="outlined" onClick={() => setNotifications([])}>
          Read All
        </Button>
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
            >
              FACENET
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link href={"/"}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <GroupIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link href={"/chat"}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MessageIcon />
                </Badge>
              </IconButton>
            </Link>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={(e) => handleOpenNoti(e)}
            >
              <Badge badgeContent={notifications?.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {session ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src={session?.user?.avatar} />
              </IconButton>
            ) : (
              <IconButton>
                <Link href="/auth/signin">
                  <Typography
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "white",
                    }}
                  >
                    LOGIN
                  </Typography>
                </Link>
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
    </Box>
  );
}
