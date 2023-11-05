"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "hidden",
    p: 4,
    borderRadius: "5px"
};

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalFeed = (props: IProps) => {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="modal-pic">
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8} sx={{ padding: "10px" }}>
              <img
                src="https://static-images.vnncdn.net/files/publish/2022/5/29/real-madrid-vs-liverpool-160.jpg"
                alt="pic"
                style={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box width="50px">
                  <img
                    src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontWeight: "bold",
                      color: "#626262",
                    }}
                  >
                    Cristiano Ronaldo
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: "12px",
                      color: "#626262",
                    }}
                  >
                    August 13 1999, 09.18 pm
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ margin: "10px 0 20px", display: "flex", gap: "20px" }}>
                <Chip
                  icon={<FavoriteIcon color="error" />}
                  label="Like"
                  sx={{ cursor: "pointer" }}
                />
                <Chip
                  icon={<CommentIcon />}
                  label="Comment"
                  sx={{ cursor: "pointer" }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                  alt="avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <TextField variant="standard" fullWidth />
              </Box>

              <List sx={{ overflow: "auto", height: "300px" }} className="list-cmt">
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <img
                      src="https://i1-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=oVyO5GsTPBtA8hXAlX4q0w"
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Ronaldo
                      </Typography>
                      <Box sx={{ display: "flex", gap: "50px" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          test cmt thoiiii
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          just now
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFeed;
