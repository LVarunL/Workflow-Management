import Workspace from "../models/Workspace";
import { LocalStorageKeys } from "../common/utils/enums";
class WorkspaceServicesClass {
  getWorkspaces(): Workspace[] {
    const workspaces = JSON.parse(
      localStorage.getItem(LocalStorageKeys.WORKSPACES) || "[]"
    );
    return workspaces;
  }
  saveWorkspaces(workspaces: Workspace[]): void {
    localStorage.setItem(
      LocalStorageKeys.WORKSPACES,
      JSON.stringify(workspaces)
    );
  }
  addWorkspace(workspace: Workspace): void {
    const workspaces = this.getWorkspaces();
    workspaces.push(workspace);
    this.saveWorkspaces(workspaces);
  }
}

const WorkspaceServices = new WorkspaceServicesClass();
export default WorkspaceServices;
