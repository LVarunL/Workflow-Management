import React, { useState } from "react";
import { TableTypes } from "../../utils/enums";
import RootTable from "./Table";
import { getConfig } from "../../utils/tableServiceUtil";
import { TableConfigs } from "../../utils/tableComponentUtil";

interface MyTableProps<T> {
  type: TableTypes;
  data: T[];
}

export default function MyTable<T>({ type, data }: MyTableProps<T>) {
  const tableConfig: TableConfigs = getConfig(type);

  return (
    <>
      <RootTable<T> data={data} tableConfig={tableConfig} />
    </>
  );
}
