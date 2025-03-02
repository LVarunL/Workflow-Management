import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { BreadcrumbContext } from "../../utils/enums";
interface IconBreadcrumbsProps {
  workspace: string;
  project?: string;
  context?: BreadcrumbContext;
}

export default function IconBreadcrumbs({
  workspace,
  project,
  context,
}: IconBreadcrumbsProps) {
  return (
    <Breadcrumbs>
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        color={project || context ? "textSecondary" : "textPrimary"}
      >
        <WorkspacesIcon fontSize="inherit" />
        {workspace}
      </Typography>

      {project && (
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="textPrimary"
        >
          <FolderIcon fontSize="inherit" />
          {project}
        </Typography>
      )}

      {context && (
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="textPrimary"
        >
          {context === BreadcrumbContext.PEOPLE && (
            <PeopleIcon fontSize="inherit" />
          )}
          {(context === BreadcrumbContext.ALL_TASKS ||
            context === BreadcrumbContext.MY_TASKS) && (
            <AssignmentIcon fontSize="inherit" />
          )}
          {context}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
