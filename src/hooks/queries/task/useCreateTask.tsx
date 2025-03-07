import { useMutation } from "@tanstack/react-query";
import { Task } from "../../../models/Task";
import { useToast } from "../../../common/components/Snackbar/SnackbarContext";
import TaskServices from "../../../services/taskServices";
import { QueryKeys, ToastSeverity } from "../../../common/utils/enums";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newTask: Task) => TaskServices.upsertTask(newTask),
    onSuccess: () => {
      showToast("Task created successfully", ToastSeverity.SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
  });
};

export default useCreateTask;
