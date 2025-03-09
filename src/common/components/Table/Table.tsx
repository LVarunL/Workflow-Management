import React from "react";
import { Columns, TableConfigs } from "../../utils/tableComponentUtil";
import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@mui/material";
// import { TableVirtuoso, TableComponents } from "react-virtuoso";
interface RootTableProps<T> {
  data: T[];
  tableConfig: TableConfigs;
  customColumns?: Columns;
}
export default function RootTable<T>({
  data,
  tableConfig,
  customColumns,
}: RootTableProps<T>) {
  let { getTableField, columns } = tableConfig;
  if (customColumns) {
    columns = customColumns;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell>{getTableField(column).label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow>
              {columns.map((column) => (
                <TableCell>{getTableField(column).renderCell(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
