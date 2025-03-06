import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../../common/utils/enums";
import WorkspaceServices from "../../../services/workspaceServices";

const useWorkspaces = () => {
  return useQuery({
    queryKey: [QueryKeys.WORKSPACES],
    queryFn: WorkspaceServices.getWorkspaces,
  });
};

export default useWorkspaces;
