import React from "react";

type Column = {
  key: string;
  label: string;
  canSort: boolean;
  renderValue: React.ReactNode;
};

type ColumnHeader = {
  key: string;
  label: string;
  canSort: boolean;
  isVisible: boolean;
  maxWidth: number;
  minWidth: number;
};

interface MyTableProps {
  columnList: Column[];
}

export default function MyTable() {
  return <div>MyTable</div>;
}
