import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../common/utils/enums";
import WorkspaceServices from "../../../services/workspaceServices";

const useWorkspacePeople = (workspaceId: string) => {
  return useQuery({
    queryKey: [QueryKeys.WORKSPACES, workspaceId, "PEOPLE"],
    queryFn: () => WorkspaceServices.getAllUsersInWorkspace(workspaceId),
  });
};

export default useWorkspacePeople;
