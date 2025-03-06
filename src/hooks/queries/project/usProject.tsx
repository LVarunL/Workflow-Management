import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../../common/utils/enums";
import ProjectServices from "../../../services/projectServices";
const useProject = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.WORKSPACES, id],
    queryFn: ({ queryKey }) => ProjectServices.getProjectById(queryKey[1]),
  });
};

export default useProject;
