import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../../common/utils/enums";
import ProjectServices from "../../../services/projectServices";

const useWorkspaceProjects = (workspaceId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECTS, workspaceId],
    queryFn: ({ queryKey }) =>
      ProjectServices.getWorkspaceProjects(queryKey[1]),
  });
};

export default useWorkspaceProjects;
