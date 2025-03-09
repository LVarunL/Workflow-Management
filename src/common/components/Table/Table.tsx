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
  IconButton,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface RootTableProps<T> {
  data: T[];
  tableConfig: TableConfigs;
  customColumns?: Columns;
  tableHeight?: number;
  onEdit?: (entityToEdit: T) => void;
  onDelete?: (id: string) => void | Promise<void>;
}

export default function RootTable<T extends { id: string }>({
  data,
  tableConfig,
  customColumns,
  tableHeight = 400,
  onEdit,
  onDelete,
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
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );

  const rowContent = (index: number, row: T) => (
    <>
      {columns.map((column, colIndex) => (
        <TableCell key={colIndex}>
          {getTableField(column).renderCell(row)}
        </TableCell>
      ))}
      {onEdit && (
        <TableCell>
          <IconButton
            onClick={() => onEdit?.(row)}
            className="transition-all rounded-full p-1 hover:bg-gray-200"
          >
            <EditIcon className="text-gray-600" />
          </IconButton>
        </TableCell>
      )}
      {onDelete && (
        <TableCell>
          <IconButton
            onClick={() => onDelete(row.id)}
            className="transition-all rounded-full p-1 hover:bg-red-100"
          >
            <DeleteIcon className="text-red-600" />
          </IconButton>
        </TableCell>
      )}
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
