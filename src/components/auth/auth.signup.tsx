"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Link from "next/link";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { sendRequest } from "@/utils/api";

const AuthSignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] =
    useState<boolean>(false);

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");

  const router = useRouter();
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifySuccess = (message: string) =>
    toast.success(message, {
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
    console.log(email, name, password, confirmPassword);
    setIsErrorEmail(false);
    setIsErrorName(false);
    setIsErrorPassword(false);
    setIsErrorConfirmPassword(false);

    setErrorEmail("");
    setErrorName("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    if (!email) {
      setIsErrorEmail(true);
      setErrorEmail("Email is not empty");
      return;
    }

    if (!name) {
      setIsErrorName(true);
      setErrorName("Name is not empty");
      return;
    }

    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty");
      return;
    }

    if (!confirmPassword) {
      setIsErrorConfirmPassword(true);
      setErrorConfirmPassword("Confirm password is not empty");
      return;
    }

    if (password === confirmPassword) {
      const res = await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
        method: "POST",
        body: {
          email: email,
          name: name,
          password: password,
        },
      });

      if (res && res.data) {
        const resLogin = await signIn("credentials", {
          username: email,
          password: password,
          redirect: false,
        });
        if (resLogin && !resLogin.error) {
          router.push("/");
          notifySuccess("Sign up successfully");
        }
      }
    } else {
      notifyError("Password and Confirm password do not match");
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
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#1976D2",
                  marginBottom: "20px",
                }}
              >
                FACENET
              </Typography>

              <Avatar>
                <LockPersonIcon />
              </Avatar>
              <Typography component={"h1"}>Sign Up</Typography>
            </Box>

            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Email"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              error={isErrorEmail}
              helperText={errorEmail}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Name"
              name="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              error={isErrorName}
              helperText={errorName}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Confirm password"
              name="confirm_password"
              autoFocus
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={isErrorConfirmPassword}
              helperText={errorConfirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              Sign Up
            </Button>
            <Typography sx={{ marginBottom: "20px", textAlign: "center" }}>
              Do you already have an account ?
              <Link
                href={"/auth/signin"}
                style={{ marginLeft: "10px", color: "#1976D2" }}
              >
                Sign in
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthSignUp;
