"use client";

import React, { useEffect } from "react";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "@types";
import { useTransaction } from "./provider";
import { currencyFormatter } from "./utils";

const CategoriesPivotTable = () => {
  const { transactions } = useTransaction();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState<
    Pick<Transaction, "category" | "outflow">[]
  >([]);

  useEffect(() => {
    const categories = transactions.map((transaction) => transaction.category);
    const uniqueCategories = [...new Set(categories)];
    const newData = uniqueCategories.map((category) => {
      const transactionsForCategory = transactions.filter(
        (transaction) => transaction.category === category
      );
      const totalOutflow = transactionsForCategory.reduce(
        (acc, transaction) => acc + transaction.outflow,
        0
      );
      return {
        category,
        outflow: totalOutflow,
      };
    });
    setData(newData);
  }, [transactions]);

  const columnHelper =
    createColumnHelper<Pick<Transaction, "category" | "outflow">>();

  const columns = [
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => currencyFormatter.format(row.outflow), {
      id: "outflow",
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

  if (!data.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Total Outflow x Categories</h1>
      <div className="flex-none mb-10 relative z-10  before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black">
        <div className="relative z-10 w-full h-full max-w-2xl max-h-96 border-2 border-black bg-white overflow-auto">
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
                        className="px-4 py-1 bg-red-500 text-white border border-black"
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
                    <td key={cell.id} className="px-4 py-1 border border-black">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
        </div>
      </div>
    </>
  );
};

export default CategoriesPivotTable;
