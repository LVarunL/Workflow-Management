import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../common/utils/enums";
import ProjectServices from "../../../services/projectServices";

const useProjectPeople = (projectId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECTS, projectId, "PEOPLE"],
    queryFn: () => ProjectServices.getAllUsersInProject(projectId),
  });
};

export default useProjectPeople;
