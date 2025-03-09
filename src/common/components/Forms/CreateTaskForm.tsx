import React, { useState } from "react";
import {
  TextField,
  Stack,
  Paper,
  Typography,
  Button,
  MenuItem,
  Chip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { useToast } from "../Snackbar/SnackbarContext";
import { QueryKeys, ToastSeverity } from "../../utils/enums";
import { Task } from "../../../models/Task";
import useCreateTask from "../../../hooks/queries/task/useCreateTask";
import { getUserFromToken } from "../../utils/authUtil";
import { TaskStatus, TaskPriority } from "../../utils/enums";

interface CreateTaskFormProps {
  onClose: () => void;
  projectId: string;
  workspaceId: string;
  users: { id: string }[];
}

const CreateTaskForm = ({
  onClose,
  projectId,
  workspaceId,
  users,
}: CreateTaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState(TaskStatus.NOT_STARTED);
  const [priority, setPriority] = useState(TaskPriority.MEDIUM);
  const [deadline, setDeadline] = useState("");

  const { showToast } = useToast();
  const mutation = useCreateTask();
  const currentUser = getUserFromToken();

  const handleCreate = () => {
    if (!taskName) {
      showToast("Task name is required", ToastSeverity.WARNING);
      return;
    }
    if (!assignedTo) {
      showToast("Please assign the task to a user", ToastSeverity.WARNING);
      return;
    }

    const newTask: Task = {
      id: uuid(),
      name: taskName,
      projectId: projectId,
      workspaceId: workspaceId,
      description: taskDescription,
      assignedTo,
      createdBy: currentUser,
      creationTime: new Date().toISOString(),
      status,
      priority,
      lastModifiedTime: new Date(),
      lastModifiedBy: currentUser,
      deadline: deadline ? new Date(deadline) : new Date(),
    };

    mutation.mutate(newTask);
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
        placeholder="Task Name"
        variant="standard"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />

      <TextField
        placeholder="Description"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />

      <TextField
        select
        label="Assign To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        fullWidth
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.id}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        fullWidth
      >
        {Object.values(TaskStatus).map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        fullWidth
      >
        {Object.values(TaskPriority).map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Deadline"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        fullWidth
      />

      <Typography> Created By</Typography>
      <Chip label={currentUser} />

      <Stack direction="row" justifyContent="space-between">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleCreate}
          disabled={mutation.isPending}
          variant="contained"
        >
          Create Task
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateTaskForm;
