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
}

export default function MyTable<T>({ type, data, columns }: MyTableProps<T>) {
  const tableConfig: TableConfigs = getConfig(type);

  return (
    <>
      <RootTable<T>
        data={data}
        tableConfig={tableConfig}
        customColumns={columns}
      />
    </>
  );
}
