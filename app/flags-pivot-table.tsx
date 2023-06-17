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
import { currencyFormatter, sortingConfig } from "./utils";

const FlagsPivotTable = () => {
  const { transactions } = useTransaction();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState<
    Pick<Transaction, "flag" | "outflow">[]
  >([]);

  useEffect(() => {
    const flags = transactions.map((transaction) => transaction.flag);
    const uniqueFlags = [...new Set(flags)];
    const newData = uniqueFlags.map((flag) => {
      const transactionsForFlag = transactions.filter(
        (transaction) => transaction.flag === flag
      );
      const totalOutflow = transactionsForFlag.reduce(
        (acc, transaction) => acc + transaction.outflow,
        0
      );
      return {
        flag,
        outflow: totalOutflow,
      };
    });
    setData(newData);
  }, [transactions]);

  const columnHelper =
    createColumnHelper<Pick<Transaction, "flag" | "outflow">>();

  const columns = [
    columnHelper.accessor("flag", {
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
      <h2 className="text-4xl font-bold mb-4">Total Outflow x Flags</h2>
      <div className="flex-none mb-10 relative z-10  before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black">
        <div className="relative z-10 w-full h-full max-w-2xl max-h-96 border-2 border-black bg-white overflow-auto">
          <table className="table-auto w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 py-1 bg-orange-500 text-white border border-black"
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
                    <th
                      key={header.id}
                      className="px-4 py-1 border border-black"
                    >
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

export default FlagsPivotTable;