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
  saveWorkspaces(workspaces: Workspace[]): void {
    localStorage.setItem(
      LocalStorageKeys.WORKSPACES,
      JSON.stringify(workspaces)
    );
  }
  async addWorkspace(workspace: Workspace): Promise<void> {
    const workspaces = await this.getWorkspaces();
    workspaces.push(workspace);
    this.saveWorkspaces(workspaces);
  }
}

const WorkspaceServices = new WorkspaceServicesClass();
export default WorkspaceServices;
