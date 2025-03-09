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
import useCreateWorkspace from "../../../hooks/queries/workspace/useCreateWorkspace";
import { getUserFromToken } from "../../utils/authUtil";
const CreateWorkspaceForm = ({ onClose }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useCreateWorkspace();

  const handleCreate = () => {
    if (!workspaceName) {
      showToast("Workspace name is required", ToastSeverity.WARNING);
      return;
    }

    const currentUser = getUserFromToken();
    const newWorkspace: Workspace = {
      id: uuid(),
      name: workspaceName,
      description: workspaceDescription,
      image: uploadedImage,
      userList: [currentUser],
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
      <MyInputs.UploadImage setUploadedImage={setUploadedImage} />

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
