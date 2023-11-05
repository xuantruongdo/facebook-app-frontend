import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const Friend = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: "bold", color: "#626262" }}
        >
          Friends
        </Typography>

        <Typography
          sx={{ fontSize: "14px", cursor: "pointer" }}
          color="primary"
        >
          All friends
        </Typography>
      </Box>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: "10px" }}
      >
        <Grid item xs={4}>
          <img
            src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/9/30/cristiano-ronaldo--169604187049959114942.jpeg"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src="https://images2.thanhnien.vn/528068263637045248/2023/9/30/cristiano-ronaldo-dong-doi-1696041870524361527992.jpeg"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src="https://estaticos.elcolombiano.com/binrepository/780x1170/0c0/780d565/none/11101/LEEH/documentation-fotos-1-12483445-993250be6b4aee9276cdad0f10911dcb_41161730_20221130065133.jpg"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src="https://image.plo.vn/w850/Uploaded/2023/kwvobciv/2023_11_05/france-football-ronaldo-1585-8162.png.webp"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src="https://image.plo.vn/Uploaded/2023/kwvobciv/2023_11_05/ronaldo-portugal-8480-2959.jpg.webp"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src="https://c.ndtvimg.com/2022-06/thj2n9q_cristiano-ronaldo-portugal-afp_625x300_06_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605"
            alt="photo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            sx={{ fontSize: "14px", color: "#626262", textAlign: "center" }}
          >
            Ronaldo
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Friend;
