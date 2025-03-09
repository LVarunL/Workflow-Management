import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../../common/utils/enums";
import WorkspaceServices from "../../../services/workspaceServices";

const useWorkspaces = (userId) => {
  return useQuery({
    queryKey: [QueryKeys.WORKSPACES],
    queryFn: () => {
      return WorkspaceServices.getWorkspacesForUser(userId);
    },
  });
};

export default useWorkspaces;
