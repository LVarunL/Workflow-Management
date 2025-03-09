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
  Link,
} from "@mui/material";
import {
  Person,
  Settings,
  Folder,
  People,
  Assignment,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import ModalForm from "../../../hooks/FormModal";
import { FormTitles } from "../../utils/enums";
import CreateProjectForm from "../Forms/CreateProjectForm";
import InviteUsersForm from "../Forms/InviteUserForm";
import useWorkspace from "../../../hooks/queries/workspace/useWorkspace";
import useWorkspaceProjects from "../../../hooks/queries/project/useWorkspaceProjects";
export default function Sidebar() {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const { data: workspace } = useWorkspace(workspaceId);
  const { data: projects } = useWorkspaceProjects(workspaceId);

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
          minWidth: 100,
        }}
      >
        <Link
          component="button"
          sx={{
            fontWeight: "bold",
            fontSize: 24,
            marginBottom: 1,
            display: "flex",
            alignItems: "center",
            color: "gray",
          }}
          onClick={() => navigate(`/${workspaceId}`)}
          underline="none"
        >
          {/* {workspace?.image && (
            <img src={workspace?.image} width={24} height={24} alt="" />
          )} */}

          {workspace?.name}
        </Link>

        <Divider sx={{ marginBottom: 1 }} />

        <List>
          <SidebarItem
            icon={<Person fontSize="small" />}
            text="Profile"
            onClick={() => {}}
          />
          <SidebarItem
            icon={<Settings fontSize="small" />}
            text="Settings"
            onClick={() => {}}
          />
        </List>

        <Divider sx={{ marginTop: 1 }} />

        <div
          onClick={() => navigate(`/${workspaceId}/projects`)}
          style={{ cursor: "pointer" }}
        >
          <SectionTitle title="Projects" />
        </div>
        <List>
          {projects?.slice(0, 10).map((project) => (
            <SidebarItem
              key={project.id}
              icon={<Folder fontSize="small" />}
              text={project?.name}
              onClick={() => navigate(`/${workspaceId}/${project.id}`)}
              nested
            />
          ))}
        </List>

        {projects?.length > 10 && (
          <ViewMoreButton
            onClick={() => navigate(`/${workspaceId}/projects`)}
          />
        )}

        <ActionButton
          text="+ Add Project"
          onClick={() => setIsProjectFormOpen(true)}
        />

        <Divider sx={{ marginBottom: 1 }} />

        <List>
          <SidebarItem
            icon={<Assignment fontSize="small" />}
            text="All Tasks"
            onClick={() => navigate(`/${workspaceId}/alltasks`)}
          />
          <SidebarItem
            icon={<Assignment fontSize="small" />}
            text="My Tasks"
            onClick={() => navigate(`/${workspaceId}/mytasks`)}
          />
        </List>

        <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

        <SidebarItem
          icon={<People fontSize="small" />}
          text="People"
          onClick={() => navigate(`/${workspaceId}/people`)}
        />
        <ActionButton
          text="+ Invite People"
          onClick={() => setIsInviteFormOpen(true)}
        />
      </Box>

      <ModalFormWrapper
        title={FormTitles.PROJECT}
        isOpen={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
      >
        <CreateProjectForm
          currentUser="varun@ontic.co"
          workspaceId={workspaceId}
          onClose={() => setIsProjectFormOpen(false)}
        />
      </ModalFormWrapper>

      <ModalFormWrapper
        title={FormTitles.INVITE}
        isOpen={isInviteFormOpen}
        onClose={() => setIsInviteFormOpen(false)}
      >
        <InviteUsersForm
          entityId={workspaceId}
          type="workspace"
          onClose={() => setIsInviteFormOpen(false)}
        />
      </ModalFormWrapper>
    </>
  );
}

function SidebarItem({ icon, text, onClick, nested = false }) {
  return (
    <ListItem
      sx={{
        height: 30,
        paddingLeft: nested ? 2 : 1,
        margin: "2px 0",
        borderRadius: 1,
        color: "#80807d",
        cursor: "pointer",
        fontSize: 14,
        "&:hover": { backgroundColor: "#e0e0dc", color: "#333" },
      }}
      onClick={onClick}
    >
      <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ fontSize: 14 }} />
    </ListItem>
  );
}

function SectionTitle({ title }) {
  return (
    <Typography
      variant="body2"
      sx={{ fontWeight: "bold", fontSize: 12, paddingTop: 2 }}
    >
      {title}
    </Typography>
  );
}

function ViewMoreButton({ onClick }) {
  return (
    <Typography
      sx={{
        color: "#0073e6",
        fontSize: 12,
        cursor: "pointer",
        paddingLeft: 1,
        "&:hover": { textDecoration: "underline" },
      }}
      onClick={onClick}
    >
      View More
    </Typography>
  );
}

function ActionButton({ text, onClick }) {
  return (
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
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

function ModalFormWrapper({ title, isOpen, onClose, children }) {
  return (
    isOpen && (
      <ModalForm title={title} isOpen={isOpen} onClose={onClose}>
        {children}
      </ModalForm>
    )
  );
}
