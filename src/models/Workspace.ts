export default interface Workspace {
  id: string;
  workspaceName: string;
  workspaceDescription: string;
  workspaceImage?: string;
  userList: string[];
}
