import React from "react";
import MyBreadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Box, Stack } from "@mui/material";
import MyButtons from "../Buttons/Buttons";
export default function Topbar() {
  return (
    <Stack direction="row" justifyContent="space-between">
      <MyBreadcrumbs workspace="MyWorkspace" />
      AppName
      <Stack direction="row">
        <MyButtons.ProfileButton /> <MyButtons.SettingsButton />
      </Stack>
    </Stack>
  );
}
