import React, { useState } from "react";
import { TextField, Box, Stack } from "@mui/material";
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
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newWorkspace: Workspace) =>
      WorkspaceServices.addWorkspace(newWorkspace),
    onSuccess: (workspace: Workspace) => {
      showToast("Workspace created successfully", ToastSeverity.SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKSPACES] });
      navigate(`/workspaces/${workspace.id}`);
    },
  });

  const handleCreate = () => {
    if (!workspaceName) {
      showToast("Workspace name is required", ToastSeverity.WARNING);
      return;
    }

    const newWorkspace: Workspace = {
      id: uuid(),
      workspaceName,
      workspaceDescription,
      userList: [],
    };

    mutation.mutate(newWorkspace);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 350 }}
    >
      <MyInputs.UploadImage />
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
        <MyButtons.InviteButton onClick={() => {}} />
        <Stack spacing={1} direction="row">
          <MyButtons.CloseModalButton text="Back" onClick={onClose} />
          <MyButtons.SubmitButton
            text="Create"
            onClick={handleCreate}
            disabled={mutation.isPending}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateWorkspaceForm;
