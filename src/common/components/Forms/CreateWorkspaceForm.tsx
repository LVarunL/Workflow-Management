import React, { useState } from "react";
import { TextField, Stack, Paper, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";

import MyButtons from "../Buttons/Buttons";
import MyInputs from "../Inputs/Inputs";
import WorkspaceServices from "../../../services/workspaceServices";
import { useToast } from "../Snackbar/SnackbarContext";
import { QueryKeys, ToastSeverity } from "../../utils/enums";
import Workspace from "../../../models/Workspace";

const CreateWorkspaceForm = ({ onClose }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newWorkspace: Workspace) =>
      WorkspaceServices.addWorkspace(newWorkspace),
    onSuccess: (workspace) => {
      showToast("Workspace created successfully", ToastSeverity.SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKSPACES] });
      navigate(`/${workspace.id}`);
    },
  });

  const handleCreate = () => {
    if (!workspaceName) {
      showToast("Workspace name is required", ToastSeverity.WARNING);
      return;
    }

    const newWorkspace = {
      id: uuid(),
      workspaceName,
      workspaceDescription,
      userList: [], //add current user here
    };

    mutation.mutate(newWorkspace);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 3,
        borderRadius: 3,
        display: "flex",
        width: 500,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <MyInputs.UploadImage />

      <TextField
        placeholder="Workspace Name"
        variant="standard"
        sx={{
          fontWeight: 500,
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f8f9fa",

          "&:hover": { backgroundColor: "#f1f3f5" },
        }}
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        required
      />

      <TextField
        placeholder="Description"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        sx={{
          borderRadius: 2,
          backgroundColor: "#f8f9fa",
          "&:hover": { backgroundColor: "#f1f3f5" },
        }}
        value={workspaceDescription}
        onChange={(e) => setWorkspaceDescription(e.target.value)}
      />

      <Button variant="outlined" fullWidth>
        + Invite People
      </Button>

      <Stack direction="row" justifyContent="space-between">
        <MyButtons.CloseModalButton text="Cancel" onClick={onClose} />
        <MyButtons.SubmitButton
          text="Create Workspace"
          onClick={handleCreate}
          disabled={mutation.isPending}
        />
      </Stack>
    </Paper>
  );
};

export default CreateWorkspaceForm;
