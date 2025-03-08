import { TaskStatus, TaskPriority } from "../common/utils/enums";
export interface Task {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  creationTime: string;
  status: TaskStatus;
  priority: TaskPriority;
  lastModifiedBy: string;
  lastModifiedTime: Date;
  deadline: Date;
  projectId: string;
  workspaceId: string;
}
