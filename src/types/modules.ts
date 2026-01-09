import { TableProps } from "@/components/Table";

export interface ModuleTables<T = unknown, P = unknown> extends Omit<
  TableProps<T>,
  "columns"
> {
  t: (key: string) => string;
  includeColumns?: P[];
  extraColumns?: TableProps<T>["columns"];
  paginationProps?: TableProps<T>["paginationProps"];
}
