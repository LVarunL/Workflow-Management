import { Task } from "../models/Task";
import { LocalStorageKeys } from "../common/utils/enums";
import {
  filterData,
  searchData,
  sortData,
} from "../common/utils/tableServiceUtil";

export type sortInfo = {
  sortOrder: "asc" | "des";
  sortKey: string;
};

export type filterInfo = {
  filterKey: string;
  filterValue: string;
};
export interface FindTaskProps {
  sortInfo?: sortInfo;
  filterInfo?: filterInfo[];
  searchQuery?: string;
}

class TaskServicesClass {
  async getTasks({
    sortInfo,
    filterInfo,
    searchQuery,
  }: FindTaskProps): Promise<Task[]> {
    console.log(sortInfo, filterInfo);
    let tasks: Task[] =
      JSON.parse(localStorage.getItem(LocalStorageKeys.TASKS)) || [];

    if (filterInfo && filterInfo.length > 0) {
      filterInfo.forEach(({ filterKey, filterValue }) => {
        tasks = filterData<Task>({
          data: tasks,
          filterKey,
          filterValue,
        });
      });
    }

    tasks = sortInfo
      ? sortData<Task>({
          data: tasks,
          sortKey: sortInfo.sortKey,
          sortOrder: sortInfo.sortOrder,
        })
      : tasks;

    tasks = searchQuery ? searchData({ data: tasks, searchQuery }) : tasks;

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
