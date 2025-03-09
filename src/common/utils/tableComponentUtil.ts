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
  EMAIL = "EMAIL",
}

export interface Field {
  label: string;
  renderCell: (data) => React.ReactNode;
  canSort: boolean;
  canFilter: boolean;
  isVisible: boolean;
  accessKey: FieldsAccessKeys;
  width: number;
}

export type Columns = FieldsAccessKeys[];

export interface TableConfigs {
  columns?: Columns;
  getTableField: (accessKey: FieldsAccessKeys) => Field;
}

export const getRandomColor = (value: string) => {
  const colors = ["#dcf0e4", "#cab5ed", "#f6bfd0", "#b1d5ef", "#aed964"];
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
