import { TaskStatus, TaskPriority } from "../common/utils/enums";
interface Task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  assignedTo: string;
  createdBy: string;
  creationTime: string;
  status: TaskStatus;
  priority: TaskPriority;
  lastModifiedTime: Date;
  deadline: Date;
}
