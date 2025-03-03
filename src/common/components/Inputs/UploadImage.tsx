import React from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function UploadImage() {
  return (
    <Stack spacing={2} alignItems="center">
      <IconButton component="label">
        <CloudUploadIcon color="primary" />
      </IconButton>
      <Typography variant="body2" color="textSecondary">
        Upload Image
      </Typography>
    </Stack>
  );
}
