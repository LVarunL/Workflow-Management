import { User } from "./User";
export interface Project {
  projectId: string;
  workspaceId: string;
  projectName: string;
  projectDescription: string;
  creationTime: Date;
  createdBy: string;
  userList: Array<string>;
}
