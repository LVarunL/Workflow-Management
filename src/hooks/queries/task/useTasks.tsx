import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../common/utils/enums";
import TaskServices from "../../../services/taskServices";
import { sortInfo, filterInfo } from "../../../services/taskServices";

export interface UseTasksParams {
  sortInfo?: sortInfo;
  filterInfo?: filterInfo[];
  searchQuery?: string;
}

const useTasks = ({ sortInfo, filterInfo, searchQuery }: UseTasksParams) => {
  return useQuery({
    queryKey: [
      QueryKeys.TASKS,
      sortInfo?.sortKey,
      sortInfo?.sortOrder,
      searchQuery,
      ...(filterInfo?.map((f) => [f.filterKey, f.filterValue]) || []),
    ],
    queryFn: () => TaskServices.getTasks({ sortInfo, filterInfo, searchQuery }),
  });
};

export default useTasks;
