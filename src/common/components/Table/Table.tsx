import React from "react";
import { TableConfigs } from "../../utils/tableComponentUtil";
import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@mui/material";

interface RootTableProps<T> {
  data: T[];
  tableConfig: TableConfigs;
}
export default function RootTable<T>({ data, tableConfig }: RootTableProps<T>) {
  const { getTableField, columns } = tableConfig;
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
