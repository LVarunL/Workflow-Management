import React from "react";
import Topbar from "../Topbar/Topbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Stack, Box } from "@mui/material";
export default function ContentLayout() {
  return (
    <Stack direction="row">
      <Box sx={{ width: "12%" }}>
        <Sidebar></Sidebar>
      </Box>

      <Stack sx={{ width: "88%" }}>
        <Topbar></Topbar>
        <Outlet />
        <Footer></Footer>
      </Stack>
    </Stack>
  );
}
