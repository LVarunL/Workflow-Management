import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../common/utils/enums";
import TaskServices from "../../../services/taskServices";
import { sortInfo, filterInfo } from "../../../services/taskServices";

interface UseTasksParams {
  sortInfo?: sortInfo;
  filterInfo?: filterInfo;
}
const useTasks = ({ sortInfo, filterInfo }: UseTasksParams) => {
  return useQuery({
    queryKey: [
      QueryKeys.TASKS,
      sortInfo?.sortKey,
      sortInfo?.sortOrder,
      filterInfo?.filterKey,
      filterInfo?.filterValue,
    ],
    queryFn: ({ queryKey }) => {
      return TaskServices.getTasks({ sortInfo, filterInfo });
    },
  });
};
export default useTasks;
