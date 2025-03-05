import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  Person,
  Settings,
  Folder,
  People,
  Assignment,
  Add,
} from "@mui/icons-material";
import ModalForm from "../../../hooks/FormModal";
import { FormTitles } from "../../utils/enums";
import CreateProjectForm from "../Forms/CreateProjectForm";
import InviteUsersForm from "../Forms/InviteUserForm";

const projects = [];
for (let i = 1; i <= 10; i += 1) {
  projects.push(`Project ${i}`);
}

export default function Sidebar() {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState<boolean>(false);
  const [isInviteFormOpen, setIsInviteFormOpen] = useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          height: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f2",
          minHeight: "100vh",
          // gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: 24, marginBottom: 1 }}
        >
          Ontic
        </Typography>

        <Divider sx={{ marginBottom: 1 }} />

        <List disablePadding>
          <SidebarItem icon={<Person fontSize="small" />} text="Profile" />
          <SidebarItem icon={<Settings fontSize="small" />} text="Settings" />
        </List>

        <Divider sx={{ marginTop: 1 }} />

        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", fontSize: 12, paddingTop: 2 }}
        >
          Projects
        </Typography>

        <List sx={{ margin: 0, padding: 0 }}>
          {projects.map((project, index) => (
            <SidebarItem
              key={index}
              icon={<Folder fontSize="small" />}
              text={project}
              nested
            />
          ))}
        </List>

        <Button
          sx={{
            justifyContent: "flex-start",
            color: "gray",
            fontSize: 12,
            paddingLeft: 1,
            marginTop: 0,
            marginBottom: 1,
            "&:hover": { color: "black" },
          }}
          onClick={() => setIsProjectFormOpen(true)}
        >
          + Add Project
        </Button>

        <Divider sx={{ marginBottom: 1 }} />

        <SidebarItem icon={<Assignment fontSize="small" />} text="All Tasks" />
        <SidebarItem icon={<Assignment fontSize="small" />} text="My Tasks" />

        <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

        <SidebarItem icon={<People fontSize="small" />} text="People" />
        <Button
          sx={{
            justifyContent: "flex-start",
            color: "gray",
            fontSize: 12,
            paddingLeft: 1,
            "&:hover": { color: "black" },
          }}
          onClick={() => setIsInviteFormOpen(true)}
        >
          + Invite People
        </Button>
      </Box>
      {isProjectFormOpen && (
        <ModalForm
          title={FormTitles.PROJECT}
          isOpen={isProjectFormOpen}
          onClose={() => setIsProjectFormOpen(false)}
        >
          <CreateProjectForm
            currentUser="varun@ontic.co"
            workspaceId="1"
            onClose={() => setIsProjectFormOpen(false)}
          />
        </ModalForm>
      )}
      {isInviteFormOpen && (
        <ModalForm
          title={FormTitles.INVITE}
          isOpen={isInviteFormOpen}
          onClose={() => setIsInviteFormOpen(false)}
        >
          <InviteUsersForm
            entityId="1"
            type="workspace"
            onClose={() => setIsInviteFormOpen(false)}
          ></InviteUsersForm>
        </ModalForm>
      )}
    </>
  );
}

function SidebarItem({ icon, text, nested = false }) {
  return (
    <ListItem
      sx={{
        height: 24,
        paddingLeft: nested ? 1 : 1,
        // padding: 1,
        margin: 0.5,
        borderRadius: 1,
        "&:hover": { backgroundColor: "#dbdbd9" },
        color: "#80807d",
        cursor: "pointer",
        // fontSize: 12,
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>{icon}</ListItemIcon>
      {text}
    </ListItem>
  );
}
