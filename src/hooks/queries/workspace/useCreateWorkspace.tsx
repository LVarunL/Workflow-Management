import { useMutation } from "@tanstack/react-query";
import Workspace from "../../../models/Workspace";
import WorkspaceServices from "../../../services/workspaceServices";

import { useNavigate } from "react-router";
import { useToast } from "../../../common/components/Snackbar/SnackbarContext";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys, ToastSeverity } from "../../../common/utils/enums";
const useCreateWorkspace = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newWorkspace: Workspace) =>
      WorkspaceServices.addWorkspace(newWorkspace),
    onSuccess: (workspace) => {
      showToast("Workspace created successfully", ToastSeverity.SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKSPACES] });
      navigate(`/${workspace.id}`);
    },
  });
};
export default useCreateWorkspace;
