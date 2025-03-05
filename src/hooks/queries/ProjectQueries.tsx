import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../common/utils/enums";
import ProjectServices from "../../services/projectServices";

function getProjectQueries() {
  const useProjects = () => {
    return useQuery({
      queryKey: [QueryKeys.WORKSPACES],
      queryFn: ProjectServices.getProjects,
    });
  };

  const useProject = (id: string) => {
    return useQuery({
      queryKey: [QueryKeys.WORKSPACES, id],
      queryFn: ({ queryKey }) => ProjectServices.getProjectById(queryKey[1]),
    });
  };

  const useWorkspaceProjects = (workspaceId: string) => {
    return useQuery({
      queryKey: [QueryKeys.PROJECTS, workspaceId],
      queryFn: ({ queryKey }) =>
        ProjectServices.getWorkspaceProjects(queryKey[1]),
    });
  };

  return { useProjects, useProject, useWorkspaceProjects };
}
export const { useProjects, useProject, useWorkspaceProjects } =
  getProjectQueries();
