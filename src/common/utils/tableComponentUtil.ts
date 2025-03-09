import { TaskStatus } from "./enums";

export enum FieldsAccessKeys {
  ID = "ID",
  NAME = "NAME",
  DESCRIPTION = "DESCRIPTION",
  ASSIGNEDTO = "ASSIGNEDTO",
  CREATEDBY = "CREATEDBY",
  CREATIONTIME = "CREATIONTIME",
  STATUS = "STATUS",
  PRIORITY = "PRIORITY",
  LASTMODIFIEDBY = "LASTMODIFIEDBY",
  LASTMODIFIEDTIME = "LASTMODIFIEDTIME",
  DEADLINE = "DEADLINE",
  PROJECTID = "PROJECTID",
  WORKSPACEID = "WORKSPACEID",
}

export interface Field {
  label: string;
  renderCell: (data) => React.ReactNode;
  canSort: boolean;
  canFilter: boolean;
  isVisible: boolean;
  accessKey: FieldsAccessKeys;
}

export type Columns = FieldsAccessKeys[];

export interface TableConfigs {
  columns: Columns;
  getTableField: (accessKey: FieldsAccessKeys) => Field;
}

export const getRandomColor = (value: string) => {
  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#03A9F4",
    "#4CAF50",
    "#FFC107",
    "#FF5722",
  ];
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
