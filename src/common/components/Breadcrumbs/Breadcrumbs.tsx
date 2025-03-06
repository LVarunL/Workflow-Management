import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { BreadcrumbContext, QueryKeys } from "../../utils/enums";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceServices from "../../../services/workspaceServices";
import ProjectServices from "../../../services/projectServices";
import { Link } from "@mui/material";
import useWorkspace from "../../../hooks/queries/workspace/useWorkspace";
import useProject from "../../../hooks/queries/project/usProject";
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
  const { data: workspace } = useWorkspace(workspaceId);
  const { data: project } = useProject(projectId);
  const navigate = useNavigate();
  return (
    <Breadcrumbs sx={{ marginLeft: 2 }}>
      <Link
        component="button"
        onClick={() => {
          navigate(`/${workspaceId}`);
        }}
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
        <Link
          sx={{ display: "flex", alignItems: "center" }}
          color="textPrimary"
          component="button"
          onClick={() => {
            navigate(`/${workspaceId}/${projectId}`);
          }}
          underline="none"
        >
          <FolderIcon fontSize="inherit" />
          {project?.projectName}
        </Link>
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
