import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import useWorkspace from "../../hooks/queries/workspace/useWorkspace";
import { Title } from "@mui/icons-material";

const WorkspaceHeader = () => {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const navigate = useNavigate();
  const { data: workspace } = useWorkspace(workspaceId);

  const handleChangeWorkspace = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        paddingY: 1,
      }}
    >
      {workspace?.workspaceImage && (
        <img src={workspace?.workspaceImage} width={36} height={36} alt="" />
      )}

      <h1 className="text-2xl font-bold">{workspace?.workspaceName}</h1>

      <Button
        variant="contained"
        size="small"
        // sx={{ maxWidth: 40 }}
        onClick={handleChangeWorkspace}
      >
        Change Workspace
      </Button>
    </AppBar>
  );
};

export default WorkspaceHeader;
