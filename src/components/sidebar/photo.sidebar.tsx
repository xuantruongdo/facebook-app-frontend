"use client";

import * as React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IProps {
  user?: IUser;
  posts?: IPost[];
  type: string;
}

const Photo = (props: IProps) => {
  const { user, posts, type } = props;
  const [photos, setPhotos] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Filter out posts without images and extract image URLs
    if (posts) {
      const imageUrls = posts
        .filter((post) => post.image) // Only posts with an 'image' property
        .map((post) => post.image); // Extract 'image' property

      // Update the 'photos' state with the collected image URLs
      setPhotos(imageUrls);
    }
  }, [posts]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "5px",
      }}
    >
      {type === "pc" && (
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
            Photos
          </Typography>

          <Typography
            sx={{ fontSize: "14px", cursor: "pointer" }}
            color="primary"
          >
            All photos
          </Typography>
        </Box>
      )}

      {type === "pc" && (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ marginTop: "10px" }}
        >
          {photos?.map((p, index) => (
            <Grid item xs={4} key={index}>
              <img
                src={p}
                alt="photo"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {type === "mobile" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {photos?.map((p, index) => (
            <img
              key={index}
              src={p}
              alt="photo"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Photo;
