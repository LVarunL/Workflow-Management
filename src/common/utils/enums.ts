export enum TaskStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  IN_REVIEW = "In Review",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum ToastSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum BreadcrumbContext {
  ALL_TASKS = "All Tasks",
  MY_TASKS = "My Tasks",
  PEOPLE = "People",
}

export enum ViewType {
  TABLE = "Table",
  KANBAN = "Kanban",
  CALENDAR = "Calendar",
}

export enum LocalStorageKeys {
  USERS = "users",
  WORKSPACES = "workspaces",
  AUTH = "auth",
  PROJECTS = "projects",
  TASKS = "tasks",
}

export enum QueryKeys {
  WORKSPACES = "workspace",
  PROJECTS = "project",
  USERS = "user",
  TASKS = "task",
}

export enum FormTitles {
  WORKSPACE = "Create Workspace",
  PROJECT = "Create Project",
  TASK = "Create Task",
  INVITE = "Invite User",
}

export enum TableTypes {
  TASK = "TASK",
  PROJECT = "PROJECT",
  PEOPLE = "PEOPLE",
}
