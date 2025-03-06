import React, { Dispatch } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SetStateAction } from "react";
export default function UploadImage({
  setUploadedImage,
}: {
  setUploadedImage: Dispatch<SetStateAction<string>>;
}) {
  const handleClick = (e) => {
    const urlImg = URL.createObjectURL(e.target.files[0]);
    console.log(urlImg);
    setUploadedImage(urlImg);
  };
  return (
    <Stack spacing={2} alignItems="center">
      <IconButton component="label">
        <input type="file" onChange={handleClick}></input>
      </IconButton>
      <Typography variant="body2" color="textSecondary">
        Upload Image
      </Typography>
    </Stack>
  );
}
