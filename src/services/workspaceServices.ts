import Workspace from "../models/Workspace";
import { LocalStorageKeys } from "../common/utils/enums";
class WorkspaceServicesClass {
  async getWorkspaces(): Promise<Workspace[]> {
    return new Promise((resolve) => {
      const workspaces = JSON.parse(
        localStorage.getItem(LocalStorageKeys.WORKSPACES) || "[]"
      );
      resolve(workspaces);
    });
  }

  async getWorkspacesForUser(userId: string): Promise<Workspace[]> {
    return new Promise(async (resolve) => {
      const workspaces = await this.getWorkspaces();
      const userWorkspaces = workspaces.filter((workspace) =>
        workspace.userList.includes(userId)
      );
      resolve(userWorkspaces);
    });
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    return new Promise(async (resolve) => {
      const workspaces = await this.getWorkspaces();
      const workspace = workspaces.find((w) => w.id === id);
      resolve(workspace);
    });
  }

  async addWorkspace(workspace: Workspace): Promise<Workspace> {
    return new Promise(async (resolve) => {
      const workspaces = await this.getWorkspaces();
      workspaces.push(workspace);
      localStorage.setItem(
        LocalStorageKeys.WORKSPACES,
        JSON.stringify(workspaces)
      );
      resolve(workspace);
    });
  }
  async addUsersToWorkspace(workspaceId: string, emails: string[]) {
    return new Promise(async (resolve) => {
      const workspaces = await this.getWorkspaces();
      const workspace = workspaces.find(
        (workspace) => workspace.id === workspaceId
      );

      const userList = workspace.userList;
      emails.forEach((email) => {
        if (!userList.includes(email)) {
          userList.push(email);
        }
      });
      workspace.userList = userList;
      localStorage.setItem(
        LocalStorageKeys.WORKSPACES,
        JSON.stringify(workspaces)
      );
      resolve(workspace);
    });
  }
  async getAllUsersInWorkspace(workspaceId: string): Promise<string[]> {
    return new Promise(async (resolve) => {
      const workspace = await this.getWorkspaceById(workspaceId);
      resolve(workspace?.userList || []);
    });
  }
}

const WorkspaceServices = new WorkspaceServicesClass();
export default WorkspaceServices;
