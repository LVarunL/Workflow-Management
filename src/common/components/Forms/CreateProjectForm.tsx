import React, { useState } from "react";
import {
  TextField,
  Stack,
  Paper,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";

import MyButtons from "../Buttons/Buttons";
import ProjectServices from "../../../services/projectServices";
import { useToast } from "../Snackbar/SnackbarContext";
import { QueryKeys, ToastSeverity } from "../../utils/enums";
import { Project } from "../../../models/Project";
import useCreateProject from "../../../hooks/queries/project/useCreateProject";
import { getUserFromToken } from "../../utils/authUtil";

interface CreateProjectFormProps {
  onClose: () => void;
  workspaceId: string;
  currentUser: string;
}
const CreateProjectForm = ({
  onClose,
  workspaceId,
}: CreateProjectFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useCreateProject(workspaceId);
  const currentUser = getUserFromToken();
  const handleCreate = () => {
    if (!projectName) {
      showToast("Project name is required", ToastSeverity.WARNING);
      return;
    }

    const newProject: Project = {
      id: uuid(),
      workspaceId,
      name: projectName,
      description: projectDescription,
      creationTime: new Date(),
      createdBy: currentUser,
      userList: [currentUser],
    };

    mutation.mutate(newProject);
    onClose();
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
      <TextField
        placeholder="Project Name"
        variant="standard"
        sx={{
          fontWeight: 500,
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f8f9fa",
          "&:hover": { backgroundColor: "#f1f3f5" },
        }}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
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
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />

      <Typography> Created By</Typography>
      <Chip label={currentUser} />
      <Stack direction="row" justifyContent="space-between">
        <MyButtons.CloseModalButton text="Cancel" onClick={onClose} />
        <MyButtons.SubmitButton
          text="Create Project"
          onClick={handleCreate}
          disabled={mutation.isPending}
        />
      </Stack>
    </Paper>
  );
};

export default CreateProjectForm;
