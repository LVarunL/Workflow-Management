import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../common/utils/enums";
import WorkspaceServices from "../../services/workspaceServices";

function getWorkspaceQueries() {
  const useWorkspaces = () => {
    return useQuery({
      queryKey: [QueryKeys.WORKSPACES],
      queryFn: WorkspaceServices.getWorkspaces,
    });
  };

  const useWorkspace = (id: string) => {
    return useQuery({
      queryKey: [QueryKeys.WORKSPACES, id],
      queryFn: ({ queryKey }) =>
        WorkspaceServices.getWorkspaceById(queryKey[1]),
    });
  };

  return { useWorkspaces, useWorkspace };
}
export const { useWorkspaces, useWorkspace } = getWorkspaceQueries();
