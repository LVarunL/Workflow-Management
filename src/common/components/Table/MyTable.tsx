import React, { useState } from "react";
import { TableTypes } from "../../utils/enums";
import RootTable from "./Table";
import { getConfig } from "../../utils/tableServiceUtil";
import { Columns, TableConfigs } from "../../utils/tableComponentUtil";

import { FieldsAccessKeys } from "../../utils/tableComponentUtil";
interface MyTableProps<T> {
  type: TableTypes;
  data: T[];
  columns?: Columns;
  tableHeight?: number;
  onEdit?: (entityToEdit: T) => void;
  onDelete?: (id: string) => void | Promise<void>;
}

export default function MyTable<T extends { id: string }>({
  type,
  data,
  columns,
  tableHeight,
  onEdit,
  onDelete,
}: MyTableProps<T>) {
  const tableConfig: TableConfigs = getConfig(type);

  return (
    <>
      <RootTable<T>
        data={data}
        tableConfig={tableConfig}
        customColumns={columns}
        tableHeight={tableHeight}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}
