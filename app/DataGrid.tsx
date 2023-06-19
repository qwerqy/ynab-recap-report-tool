"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTransaction } from "./provider";
import { FLAG } from "@utils/types";
import { currencyFormatter } from "@utils/app-utils";
import { FlagBadge } from "@components/flag-badge";

export const DataGrid = () => {
  const { transactions } = useTransaction();
  const [totalOutflow, setTotalOutflow] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [highestOutflow, setHighestOutflow] = useState(0);
  const [highestOutflowFlag, setHighestOutflowFlag] = useState<FLAG>();
  const [highestOutflowCategory, setHighestOutflowCategory] = useState("");
  const [period, setPeriod] = useState<Date[]>([]);

  useEffect(() => {
    if (!transactions.length) return;

    const totalOutflow = transactions.reduce(
      (acc, transaction) => acc + transaction.outflow,
      0
    );
    setTotalOutflow(totalOutflow);

    const totalTransactions = transactions.length;
    setTotalTransactions(totalTransactions);

    const highestOutflow = transactions.reduce(
      (acc, transaction) => Math.max(acc, transaction.outflow),
      0
    );
    setHighestOutflow(highestOutflow);

    const outflowWithFlag = transactions.reduce(
      (acc, transaction) => {
        acc[transaction.flag] += transaction.outflow;

        return acc;
      },
      {
        [FLAG.SHOULDNT_HAVE]: 0,
        [FLAG.NICE_TO_HAVE]: 0,
        [FLAG.NEED_TO_HAVE]: 0,
        [FLAG.ESSENTIAL]: 0,
      }
    );

    // Find the flag with the highest amount of outflow
    const highestOutflowFlag = Object.entries(outflowWithFlag).reduce(
      (acc, [flag, outflow]) => {
        if (outflow > acc[1]) {
          return [flag, outflow];
        }

        return acc;
      },
      ["", 0]
    )[0] as FLAG;

    setHighestOutflowFlag(highestOutflowFlag);

    // Get the most used categories used within transactions
    const categories = transactions.map((transaction) => transaction.category);
    const uniqueCategories = [...new Set(categories)];

    // Get the total outflow for each category
    const outflowWithCategory = uniqueCategories.reduce((acc, category) => {
      const transactionsForCategory = transactions.filter(
        (transaction) => transaction.category === category
      );
      const totalOutflow = transactionsForCategory.reduce(
        (acc, transaction) => acc + transaction.outflow,
        0
      );
      acc[category] = totalOutflow;

      return acc;
    }, {} as Record<string, number>);

    // get the category with the highest outflow
    const highestOutflowCategory = Object.entries(outflowWithCategory).reduce(
      (acc, [category, outflow]) => {
        if (outflow > acc[1]) {
          return [category, outflow];
        }

        return acc;
      },
      ["", 0]
    )[0];

    setHighestOutflowCategory(highestOutflowCategory);

    // Get the start date and end date of the transactions and set the period
    const dates = transactions.map(
      (transaction) =>
        new Date(
          transaction.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
        )
    );

    // @ts-expect-error a
    const startDate = new Date(Math.min(...dates));
    // @ts-expect-error b
    const endDate = new Date(Math.max(...dates));
    setPeriod([startDate, endDate]);
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 my-10">
      <DataCard bgColor={"bg-green-500"}>
        <span className="text-lg">Total Outflow</span>
        {currencyFormatter.format(totalOutflow)}
      </DataCard>
      <DataCard bgColor={"bg-indigo-500"}>
        <span className="text-lg">Total Transactions</span>
        {totalTransactions} transactions
      </DataCard>
      <DataCard bgColor={"bg-pink-500"}>
        <span className="text-lg">Highest Outflow</span>
        {currencyFormatter.format(highestOutflow)}
      </DataCard>
      <DataCard bgColor={"bg-yellow-100"}>
        <span className="text-lg">Flag with the highest total outflow</span>
        <FlagBadge flag={highestOutflowFlag} />
      </DataCard>
      <DataCard bgColor={"bg-blue-500"}>
        <span className="text-lg">Category with the highest total outflow</span>
        {highestOutflowCategory}
      </DataCard>
      <DataCard bgColor={"bg-orange-500"}>
        <span className="text-lg">Period</span>
        {period[0]?.toLocaleDateString()} to {period[1]?.toLocaleDateString()}
      </DataCard>
    </div>
  );
};

const DataCard = ({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor: string;
}) => (
  <div
    className={`flex flex-col font-bold text-4xl px-2 py-4 border-4 border-black text-center overflow-hidden shadow rounded-lg ${bgColor}`}
  >
    {children}
  </div>
);
