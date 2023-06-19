"use client";

import React, { useEffect } from "react";
import {
  Row,
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
import { useRouter } from "next/navigation";

const CategoriesPivotTable = () => {
  const router = useRouter();
  const { transactions } = useTransaction();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState<
    Pick<Transaction, "category" | "outflow">[]
  >([]);

  useEffect(() => {
    if (!transactions.length) return;

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

  const handleRowClick = (
    row: Row<Pick<Transaction, "category" | "outflow">>
  ) => {
    const category: string = row.getValue("category");

    router.push("/transactions?category=" + encodeURIComponent(category));
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Total Outflow x Categories</h2>
      <TableWrapper>
        <table className="table-auto font-medium">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-1 bg-red-500 text-white border border-black"
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
              <tr
                key={row.id}
                className="hover:bg-slate-100"
                onClick={() => handleRowClick(row)}
              >
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
    </div>
  );
};

export default CategoriesPivotTable;
