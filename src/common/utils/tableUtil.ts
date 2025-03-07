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
