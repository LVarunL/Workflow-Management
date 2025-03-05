import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { BreadcrumbContext, QueryKeys } from "../../utils/enums";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceServices from "../../../services/workspaceServices";
import ProjectServices from "../../../services/projectServices";
import { Icon, Link } from "@mui/material";
interface MyBreadcrumbsProps {
  //   workspace?: string;
  //   project?: string;
  context?: BreadcrumbContext;
}

export default function MyBreadcrumbs({
  //   workspace,
  //   project,
  context,
}: MyBreadcrumbsProps) {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId;
  console.log(projectId);
  const { data: workspace } = useQuery({
    queryKey: [QueryKeys.WORKSPACES, workspaceId],
    queryFn: ({ queryKey }) => WorkspaceServices.getWorkspaceById(queryKey[1]),
  });
  const { data: project } = useQuery({
    queryKey: [QueryKeys.PROJECTS, projectId],
    queryFn: ({ queryKey }) => ProjectServices.getProjectById(queryKey[1]),
    select: (data) => data.projectName,
  });
  console.log(workspace, project);
  return (
    <Breadcrumbs sx={{ marginLeft: 2 }}>
      <Link
        underline="none"
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        color={project || context ? "textSecondary" : "textPrimary"}
      >
        {workspace?.workspaceImage ? (
          <img src={workspace?.workspaceImage} width={24} height={24}></img>
        ) : (
          <WorkspacesIcon fontSize="inherit" />
        )}

        {workspace?.workspaceName}
      </Link>

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
