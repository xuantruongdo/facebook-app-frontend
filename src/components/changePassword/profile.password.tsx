"use client";

import * as React from "react";
import {
  Button,
  Card,
  TextField,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { notifyError, notifySuccess } from "@/app/logic/logic";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ChangPassword = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const isScreen600 = useMediaQuery("(max-width:600px)");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      notifyError("Confirm password do not match");
      return;
    }

    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/change-password`,
      method: "PATCH",
      body: {
        current_password: currentPassword,
        new_password: newPassword,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      notifySuccess("Change password successfully");
      router.refresh();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      notifyError(res?.message); 
    }
  };
  return (
    <Card sx={{ width: `${isScreen600 ? "80vw" : "40vw"}`, backgroundColor: "white" }}>
      <Container>
        <Typography
          sx={{
            fontSize: "24px",
            textAlign: "center",
            marginTop: "20px",
            color: "#1976D2",
            fontWeight: "bold",
          }}
        >
          Change my password
        </Typography>
        <TextField
          type="password"
          label="Current password"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="New password"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Confirm password"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ margin: "20px 0", float: "right" }}
          onClick={handleChangePassword}
        >
          Save
        </Button>
      </Container>
    </Card>
  );
};

export default ChangPassword;
