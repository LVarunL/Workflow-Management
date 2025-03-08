import { Task } from "../models/Task";
import { LocalStorageKeys } from "../common/utils/enums";
import { filterData, sortData } from "../common/utils/tableServiceUtil";

export type sortInfo = {
  isSort: boolean;
  sortOrder: "asc" | "des";
  sortKey: string;
};

export type filterInfo = {
  isFilter: boolean;
  filterKey: string;
  filterValue: string;
};
export interface FindTaskProps {
  sortInfo?: sortInfo;
  filterInfo?: filterInfo;
}
class TaskServicesClass {
  async getTasks({
    sortInfo = { isSort: false, sortKey: null, sortOrder: null },
    filterInfo = { isFilter: false, filterKey: null, filterValue: null },
  }: FindTaskProps): Promise<Task[]> {
    console.log(sortInfo, filterInfo);
    let tasks: Task[] =
      JSON.parse(localStorage.getItem(LocalStorageKeys.TASKS)) || [];

    tasks = filterInfo.isFilter
      ? filterData<Task>({
          data: tasks,
          filterKey: filterInfo.filterKey,
          filterValue: filterInfo.filterValue,
        })
      : tasks;

    if (sortInfo.isSort === true) {
      tasks = sortData<Task>({
        data: tasks,
        sortKey: sortInfo.sortKey,
        sortOrder: sortInfo.sortOrder,
      });
    }

    return tasks;
  }

  async upsertTask(task: Task): Promise<Task> {
    console.log(task);
    let tasks = await this.getTasks({});
    const existingIndex = tasks.findIndex((t) => t.id === task.id);

    if (existingIndex !== -1) {
      tasks[existingIndex] = task;
    } else {
      tasks = [task, ...tasks];
    }

    localStorage.setItem(LocalStorageKeys.TASKS, JSON.stringify(tasks));
    return task;
  }
}

const TaskServices = new TaskServicesClass();
export default TaskServices;
