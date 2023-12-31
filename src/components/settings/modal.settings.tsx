"use client";

import * as React from "react";
import { Modal, Box, Grid, TextField, Button, useMediaQuery } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/app/logic/logic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  outline: "none",
};

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  user: IUser;
}
const ModalSetting = (props: IProps) => {
  const isScreenMin900 = useMediaQuery("(min-width:900px)");
  const isScreen900 = useMediaQuery("(max-width:900px)");
  const isScreen600 = useMediaQuery("(max-width:600px)");
  const isScreen400 = useMediaQuery("(max-width:400px)");

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isScreen400 ? "90%" : isScreen600 ? "80%" : isScreen900 ? "80%" : isScreenMin900 ? "40%" : "",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
    outline: "none",
  };

  const { open, setOpen, user } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [note, setNote] = React.useState<string>("");
  const [work, setWork] = React.useState<string>("");
  const [live, setLive] = React.useState<string>("");
  const [from, setFrom] = React.useState<string>("");

  const handleSave = async () => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${user?._id}`,
      method: "PATCH",
      body: {
        note,
        work,
        live,
        from,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res && res.data) {
      notifySuccess("Updated successfully");
      router.refresh();
      setOpen(false);
    } else {
      notifyError(res?.message);
    }
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              label="Note"
              variant="standard"
              defaultValue={user?.note}
              fullWidth
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Work"
              variant="standard"
              defaultValue={user?.work}
              fullWidth
              onChange={(e) => setWork(e.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Live"
              variant="standard"
              defaultValue={user?.live}
              fullWidth
              onChange={(e) => setLive(e.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="From"
              variant="standard"
              defaultValue={user?.from}
              fullWidth
              onChange={(e) => setFrom(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalSetting;
