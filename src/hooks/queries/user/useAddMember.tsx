import { useMutation } from "@tanstack/react-query";
import WorkspaceServices from "../../../services/workspaceServices";
import ProjectServices from "../../../services/projectServices";
import { useToast } from "../../../common/components/Snackbar/SnackbarContext";
import { ToastSeverity } from "../../../common/utils/enums";
const useAddMember = (type: string, entityId: string, onClose: () => void) => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (emails: string[]) =>
      type === "workspace"
        ? WorkspaceServices.addUsersToWorkspace(entityId, emails)
        : ProjectServices.addUsersToProject(entityId, emails),
    onSuccess: () => {
      showToast("Users invited successfully!", ToastSeverity.SUCCESS);
      onClose();
    },
  });
};

export default useAddMember;
