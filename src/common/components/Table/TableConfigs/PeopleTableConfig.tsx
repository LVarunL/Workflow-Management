import {
  Columns,
  Field,
  FieldsAccessKeys,
  getRandomColor,
  TableConfigs,
} from "../../../utils/tableComponentUtil";
import { Tooltip } from "@mui/material";

const PeopleTableColumns: Columns = [FieldsAccessKeys.EMAIL];

const Email: Field = {
  label: "Email",
  width: 20,
  renderCell: (data: string) => (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
        style={{ backgroundColor: getRandomColor(data) }}
      >
        {data.charAt(0).toUpperCase()}
      </div>
      <div>{data}</div>
    </div>
  ),
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.EMAIL,
};

const getPeopleTableField = (accessKey: FieldsAccessKeys): Field => {
  switch (accessKey) {
    case FieldsAccessKeys.EMAIL:
      return Email;
  }
};

const PeopleTableConfig: TableConfigs = {
  columns: PeopleTableColumns,
  getTableField: getPeopleTableField,
};

export default PeopleTableConfig;
