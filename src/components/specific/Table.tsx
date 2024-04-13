import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";
import { ColumnsType, DataType } from "../../App";

type ColumnSort = {
  id: string;
  desc: boolean;
};

type TableProp = {
  data: DataType[];
  columns: ColumnsType[];
};
const Table = ({ data, columns }: TableProp) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState("");

  // instance of react-table
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  console.log(table.getState()); // access the sorting state from the table instance

  return (
    <div className="w3-container">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="border border-black border-solid outline-none text-center p-2 "
      />
      <table className="w3-table w3-striped w3-border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          className="disabled:cursor-not-allowed "
        >
          First
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="disabled:cursor-not-allowed "
        >
          Prev
        </button>
        <div>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="disabled:cursor-not-allowed "
        >
          Next
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="disabled:cursor-not-allowed "
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Table;
