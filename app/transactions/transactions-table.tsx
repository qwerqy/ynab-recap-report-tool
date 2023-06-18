"use client";

import React, { useEffect, useState } from "react";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "@types";
import { useTransaction } from "../provider";
import { currencyFormatter, sortingConfig } from "../utils";
import { TableWrapper } from "@components/table-wrapper";
import { useSearchParams } from "next/navigation";

const TransactionsTable = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const flag = params?.get("flag");
  const { transactions } = useTransaction();
  const [data, setData] = useState<Transaction[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  useEffect(() => {
    if (category) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.category === category
      );
      setData(filteredTransactions);
    }

    if (flag) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.flag === flag
      );
      setData(filteredTransactions);
    }
  }, [params, transactions]);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("account", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("flag", {
      cell: (info) => info.getValue(),
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
      footer: ({ table }) => {
        const total = table
          .getFilteredRowModel()
          .rows.reduce(
            (total, row) => total + row.getValue<number>("outflow"),
            0
          );

        return (
          <p className="text-right">Total: {currencyFormatter.format(total)}</p>
        );
      },
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

  if (!data.length) {
    return null;
  }

  return (
    <>
      <h2 className="text-4xl font-bold mb-4">
        Transactions for <span className="underline">{category || flag}</span>
      </h2>
      <TableWrapper className="max-h-[80vh]">
        <table
          className="table-auto"
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

export default TransactionsTable;
