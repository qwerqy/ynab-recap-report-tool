"use client";

import React from "react";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "@types";

type Props = {
  data: Transaction[];
};

const Table = ({ data }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("account", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("flag", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("payee", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("categoryGroup", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("memo", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("outflow", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("cleared", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
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
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default Table;
