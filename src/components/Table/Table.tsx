import {
  Table as MuiTable,
  PaginationProps,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useStore } from "@/data/store";
import React, { ReactNode, useMemo } from "react";
import { QueryState } from "../../types/form";
import Pagination from "../Pagination";
import Results from "../Results";

export interface TableProps<T> extends Partial<TableOptions<T>> {
  data: T[];
  columns: ColumnDef<T>[];
  isPaginated?: boolean;
  isExpandable?: boolean;
  showHeader?: boolean;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  last_page?: number;
  dense?: boolean;
  queryState?: QueryState;
  errorMessage?: ReactNode;
  noResultsMessage?: ReactNode;
  total?: number;
  sx?: React.CSSProperties;
  paginationProps?: PaginationProps;
}

const Table = <T,>({
  data,
  columns,
  isPaginated = false,
  showHeader = true,
  page,
  setPage,
  last_page,
  queryState,
  dense = true,
  errorMessage = "Error",
  noResultsMessage = "No results",
  total,
  sx,
  paginationProps,
  ...restProps
}: TableProps<T>) => {
  const perPage = useStore(state => state.getApplication().system.PER_PAGE);

  const initialState = useMemo(
    () => ({
      pagination: {
        pageSize: Number(perPage.value),
      },
    }),
    [perPage.value]
  );

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: safeData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
    ...restProps,
    initialState,
  });

  const rows = useMemo(() => {
    const rowModel = table.getRowModel();
    return rowModel?.rows ?? [];
  }, [safeData]);

  const resultsTotal = (isPaginated ? total : data?.length) || 0;

  return (
    <Results
      total={resultsTotal}
      queryState={queryState}
      noResultsMessage={noResultsMessage}
      errorMessage={errorMessage}
      pagination={
        isPaginated && (
          <Pagination
            count={last_page}
            page={page}
            onChange={(e: React.ChangeEvent<unknown>, page: number) => {
              setPage?.(page);
            }}
            {...paginationProps}
          />
        )
      }>
      <TableContainer sx={{ my: 1, ...sx }}>
        <MuiTable size={dense ? "small" : "medium"}>
          {showHeader && (
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      sx={{
                        minWidth: header.getSize() !== 150 && header.getSize(),
                      }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          )}

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} role="row">
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      borderBottom: "neutralGrey.main",
                      py: 1,
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Results>
  );
};

export default Table;
