import React, { useState } from "react";
import { TextField, Stack, Chip, Paper, Button, MenuItem } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserServices from "../../../services/userServices";
import WorkspaceServices from "../../../services/workspaceServices";
import ProjectServices from "../../../services/projectServices";
import { useToast } from "../Snackbar/SnackbarContext";

import { QueryKeys, ToastSeverity } from "../../utils/enums";
import { User } from "../../../models/User";
import useAddMember from "../../../hooks/queries/user/useAddMember";
import useWorkspace from "../../../hooks/queries/workspace/useWorkspace";
import { useUsers } from "../../../hooks/queries/user/useUsers";
import useWorkspacePeople from "../../../hooks/queries/workspace/useWorkspacePeople";
import { useParams } from "react-router";
interface InviteUsersFormProps {
  entityId: string;
  type: "workspace" | "project";
  onClose: () => void;
}
const InviteUsersForm = ({ entityId, type, onClose }: InviteUsersFormProps) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const { showToast } = useToast();

  const params = useParams();
  const workspaceId = params.workspaceId;
  const { data: registeredUsers = [] } = useUsers();

  const { data: workspaceUsers = [] } = useWorkspacePeople(workspaceId);
  function validateEmail(email: string): boolean {
    //how what why kya kaise kyu shu kem kemnu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const addUsersMutation = useAddMember(type, entityId, onClose);

  const handleAddEmail = () => {
    if (!validateEmail(email)) {
      showToast("Invalid email format!", ToastSeverity.WARNING);
      return;
    }

    if (!registeredUsers.some((user) => user.email === email)) {
      showToast("User is not registered!", ToastSeverity.WARNING);
      return;
    }

    if (emails.includes(email)) {
      showToast("Email already added!", ToastSeverity.INFO);
      return;
    }
    if (type === "project" && !workspaceUsers.some((user) => user === email)) {
      showToast(
        "User must be part of the workspace first!",
        ToastSeverity.WARNING
      );
      return;
    }
    setEmails([...emails, email]);
    setEmail("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const handleInvite = () => {
    if (emails.length === 0) {
      showToast("No users to invite!", ToastSeverity.WARNING);
      return;
    }

    addUsersMutation.mutate(emails);
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
      <Stack direction="row" spacing={1} alignItems="center">
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          Invite people to {type === "workspace" ? "Workspace" : "Project"}
        </span>
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          placeholder="Enter email..."
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
          variant="outlined"
          sx={{ backgroundColor: "#f8f9fa", borderRadius: 2 }}
        />
        <Button variant="contained" onClick={handleAddEmail}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {emails.map((email) => (
          <Chip
            key={email}
            label={email}
            onDelete={() => handleRemoveEmail(email)}
            sx={{ borderRadius: "50px", padding: "4px" }}
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        fullWidth
        onClick={handleInvite}
        disabled={emails.length === 0 || addUsersMutation.isPending}
      >
        Invite
      </Button>
    </Paper>
  );
};

export default InviteUsersForm;
