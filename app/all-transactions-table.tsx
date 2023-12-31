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
import { Transaction } from "@utils/types";
import { useTransaction } from "./provider";
import { currencyFormatter, sortingConfig } from "../utils/app-utils";
import { TableWrapper } from "@components/table-wrapper";
import { FlagBadge } from "@components/flag-badge";

const AllTransactionsTable = () => {
  const { transactions: data } = useTransaction();
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "outflow", desc: true },
  ]);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("account", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("flag", {
      cell: (info) => <FlagBadge flag={info.getValue()} />,
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("payee", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("categoryGroup", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("memo", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("outflow", {
      cell: (info) => (
        <p className="text-right">
          {currencyFormatter.format(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("cleared", {
      cell: (info) => info.getValue(),
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

  if (!data?.length) {
    return null;
  }

  return (
    <>
      <h2 className="text-4xl font-bold mb-4">All Transactions</h2>
      <TableWrapper>
        <table
          className="table-auto font-medium"
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-1 bg-purple-500 text-white border border-black"
                      style={{
                        width: header.getSize(),
                      }}
                    >
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
                          {sortingConfig[
                            header.column.getIsSorted() as string
                          ] ?? null}
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
                  <td key={cell.id} className="px-4 py-1 border border-black">
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
                  <th key={header.id} className="px-4 py-1 border border-black">
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
      </TableWrapper>
    </>
  );
};

export default AllTransactionsTable;
