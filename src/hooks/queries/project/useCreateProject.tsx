import { useMutation } from "@tanstack/react-query";
import { Project } from "../../../models/Project";
import { useToast } from "../../../common/components/Snackbar/SnackbarContext";
import ProjectServices from "../../../services/projectServices";
import { QueryKeys, ToastSeverity } from "../../../common/utils/enums";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const useCreateProject = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newProject: Project) =>
      ProjectServices.upsertProject(newProject),
    onSuccess: (project) => {
      showToast("Project created successfully", ToastSeverity.SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECTS] });
      navigate(`/${workspaceId}/${project.id}`);
    },
  });
};

export default useCreateProject;
