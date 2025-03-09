import { User } from "./User";
export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  creationTime: Date;
  createdBy: string;
  userList: Array<string>;
  lastModifiedBy?: string;
  lastModifiedTime?: Date;
  isDeleted?: boolean;
}
