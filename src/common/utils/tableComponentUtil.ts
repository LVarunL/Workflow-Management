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
