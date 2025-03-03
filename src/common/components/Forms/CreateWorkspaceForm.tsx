import React, { useState } from "react";
import { TextField, Box, Stack } from "@mui/material";

import MyButtons from "../Buttons/Buttons";
import WorkspaceServices from "../../../services/workspaceServices";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { useToast } from "../Snackbar/SnackbarContext";
import { ToastSeverity } from "../../utils/enums";
import Workspace from "../../../models/Workspace";
import MyInputs from "../Inputs/Inputs";
const CreateWorkspaceForm = ({ onClose }) => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCreate = () => {
    if (!workspaceName) {
      showToast("Workspace name is required", ToastSeverity.WARNING);
      return;
    }

    const newWorkspace: Workspace = {
      id: uuidv4(),
      workspaceName,
      workspaceDescription,
      userList: [],
    };

    WorkspaceServices.addWorkspace(newWorkspace);
    showToast("Workspace created successfully", ToastSeverity.SUCCESS);

    onClose();
    navigate(`/workspaces/${newWorkspace.id}`);
  };

  const handleInviteClick = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 350,
      }}
    >
      <MyInputs.UploadImage></MyInputs.UploadImage>
      <TextField
        label="Workspace Name"
        fullWidth
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        required
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={workspaceDescription}
        onChange={(e) => setWorkspaceDescription(e.target.value)}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MyButtons.InviteButton onClick={handleInviteClick} />
        <Stack spacing={1} direction="row">
          <MyButtons.CloseModalButton text="Back" onClick={onClose} />
          <MyButtons.SubmitButton text="Create" onClick={handleCreate} />
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateWorkspaceForm;
