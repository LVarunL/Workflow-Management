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
import { TableVirtuoso, TableComponents } from "react-virtuoso";

interface RootTableProps<T> {
  data: T[];
  tableConfig: TableConfigs;
  customColumns?: Columns;
  tableHeight?: number;
}

export default function RootTable<T>({
  data,
  tableConfig,
  customColumns,
  tableHeight = 400,
}: RootTableProps<T>) {
  let { getTableField, columns } = tableConfig;
  if (customColumns) {
    columns = customColumns;
  }

  // Define the TableComponents for Virtuoso
  const VirtuosoTableComponents: TableComponents<T> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer
        component={Paper}
        {...props}
        ref={ref}
        sx={{
          maxHeight: tableHeight,
          "& .MuiTableHead-root": {
            position: "sticky",
            top: 0,
            zIndex: 2,
            backgroundColor: "background.paper",
          },
        }}
      />
    )),
    Table: (props) => <Table {...props} stickyHeader />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns?.map((column, index) => (
        <TableCell key={index} sx={{ backgroundColor: "background.paper" }}>
          {getTableField(column).label}
        </TableCell>
      ))}
    </TableRow>
  );

  // Row content renderer
  const rowContent = (_index: number, row: T) => (
    <>
      {columns.map((column, colIndex) => (
        <TableCell key={colIndex}>
          {getTableField(column).renderCell(row)}
        </TableCell>
      ))}
    </>
  );

  return (
    <TableVirtuoso
      style={{ height: tableHeight }}
      data={data || []}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
    />
  );
}
