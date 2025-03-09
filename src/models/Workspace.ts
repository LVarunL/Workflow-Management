export default interface Workspace {
  id: string;
  name: string;
  description: string;
  image?: string;
  userList: string[];
  isDeleted?: boolean;
}
