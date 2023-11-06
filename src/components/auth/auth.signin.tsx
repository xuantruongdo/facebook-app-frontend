"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "next/link";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthSignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const router = useRouter();
  const notify = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorPassword(false);
    setErrorUsername("");
    setErrorPassword("");

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username is not empty");
      return;
    }

    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty");
      return;
    }

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/");
    } else {
      notify(res?.error!)
    }
  };
  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{ boxShadow: "rgba(100, 100, 111, 0.2)  0px 7px 29px 0px" }}
        >
          <div style={{ margin: "20px" }}>
            <Link href={"/"}>
              <ArrowBack />
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Avatar>
                <LockPersonIcon />
              </Avatar>
              <Typography component={"h1"}>Sign in</Typography>
            </Box>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Username"
              name="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              error={isErrorUsername}
              helperText={errorUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              name="password"
              autoFocus
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              error={isErrorPassword}
              helperText={errorPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{
                my: 3,
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Divider>Or using</Divider>
            <Box
              sx={{
                display: "flex",
                gap: "25px",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Avatar
                sx={{ cursor: "pointer", bgcolor: "orange" }}
                  onClick={() => signIn("github")}
              >
                <GitHubIcon titleAccess="Login with Github" />
              </Avatar>
              <Avatar sx={{ cursor: "pointer", bgcolor: "orange" }}>
                <GoogleIcon titleAccess="Login with Google" />
              </Avatar>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthSignIn;
