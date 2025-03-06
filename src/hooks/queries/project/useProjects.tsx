import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKeys } from "../../../common/utils/enums";
import ProjectServices from "../../../services/projectServices";

const useProjects = () => {
  return useQuery({
    queryKey: [QueryKeys.WORKSPACES],
    queryFn: ProjectServices.getProjects,
  });
};

export default useProjects;
