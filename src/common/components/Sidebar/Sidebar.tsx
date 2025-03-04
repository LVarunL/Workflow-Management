import React from "react";
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

const projects = [];
for (let i = 1; i <= 10; i += 1) {
  projects.push(`Project ${i}`);
}

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: "100%",
        padding: 1,
        display: "flex",
        flexDirection: "column",
        // gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 32 }}>
        Ontic
      </Typography>

      <Divider />

      <List>
        <SidebarItem icon={<Person fontSize="small" />} text="Profile" />
        <SidebarItem icon={<Settings fontSize="small" />} text="Settings" />
      </List>

      <Divider />

      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", fontSize: 16, paddingTop: 2 }}
      >
        Projects
      </Typography>

      <List>
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
          "&:hover": { color: "black" },
        }}
      >
        + Add Project
      </Button>

      <Divider />

      {/* Tasks */}
      <SidebarItem icon={<Assignment fontSize="small" />} text="All Tasks" />
      <SidebarItem icon={<Assignment fontSize="small" />} text="My Tasks" />

      <Divider />

      {/* People */}
      <SidebarItem icon={<People fontSize="small" />} text="People" />
      <Button
        sx={{
          justifyContent: "flex-start",
          color: "gray",
          fontSize: 12,
          paddingLeft: 1,
          "&:hover": { color: "black" },
        }}
      >
        + Invite People
      </Button>
    </Box>
  );
}

function SidebarItem({ icon, text, nested = false }) {
  return (
    <ListItem
      sx={{
        height: 32,
        paddingLeft: nested ? 2 : 1,
        borderRadius: 1,
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
