import PeopleTableConfig from "../components/Table/TableConfigs/PeopleTableConfig";
import ProjectTableConfigs from "../components/Table/TableConfigs/ProjectTableConfig";
import TaskTableConfigs from "../components/Table/TableConfigs/TaskTableConfigs";
import { TableTypes } from "./enums";
import { Field, TableConfigs } from "./tableComponentUtil";

interface SortDataParams<T> {
  data: T[];
  sortKey: string;
  sortOrder: "asc" | "des";
}
interface FilterDataParams<T> {
  data: T[];
  filterKey: string;
  filterValue: string;
}
interface SearchDataParams<T> {
  data: T[];
  searchQuery: string | null;
}

export function sortData<T>({
  data,
  sortKey,
  sortOrder,
}: SortDataParams<T>): T[] {
  return [...data].sort((a, b) => {
    const valueA = a[sortKey] ?? "";
    const valueB = b[sortKey] ?? "";

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
}

export function filterData<T>({
  data,
  filterKey,
  filterValue,
}: FilterDataParams<T>): T[] {
  return [...data].filter((a) => a[filterKey] === filterValue);
}

export function searchData<T extends { id: number | string; name?: string }>({
  data,
  searchQuery,
}: SearchDataParams<T>): T[] {
  if (!searchQuery) return data;

  const searchLower = searchQuery.toLowerCase();

  return data.filter(
    (row) =>
      row.id.toString().includes(searchLower) ||
      (row.name?.toLowerCase().includes(searchLower) ?? false)
  );
}

export function getConfig(type: TableTypes): TableConfigs {
  switch (type) {
    case TableTypes.TASK:
      return TaskTableConfigs;
    case TableTypes.PROJECT:
      return ProjectTableConfigs;
    case TableTypes.PEOPLE:
      return PeopleTableConfig;
  }
  return TaskTableConfigs;
}
