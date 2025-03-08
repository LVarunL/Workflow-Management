import { Task } from "../../../../models/Task";
import {
  Field,
  FieldsAccessKeys,
  TableConfigs,
} from "../../../utils/tableComponentUtil";
import { Columns } from "../../../utils/tableComponentUtil";

const TaskTableColumns: Columns = [FieldsAccessKeys.ID, FieldsAccessKeys.NAME];

const ID: Field = {
  label: "id",
  renderCell: (data: Task) => {
    return <span>{data.id}</span>;
  },
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.ID,
};

const Name: Field = {
  label: "Name",
  renderCell: (data: Task) => {
    return <span style={{ fontWeight: 10 }}>{data.name}</span>;
  },
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.NAME,
};

// const TaskTableFields: Field[] = [ID, Name];

const getTaskTableField = (accessKey: FieldsAccessKeys): Field => {
  switch (accessKey) {
    case FieldsAccessKeys.ID:
      return ID;
    case FieldsAccessKeys.NAME:
      return Name;
  }
};

const TaskTableConfigs: TableConfigs = {
  columns: TaskTableColumns,
  getTableField: getTaskTableField,
};
export default TaskTableConfigs;
