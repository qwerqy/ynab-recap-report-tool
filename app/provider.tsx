"use client";

import { Transaction } from "@types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export const TransactionContext = createContext<{
  transactions: Transaction[];
  setTransactions: (v: Transaction[]) => void;
} | null>(null);

export const useTransaction = () => {
  const transactionsObj = useContext(TransactionContext);
  if (!transactionsObj) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return transactionsObj;
};

export const TransactionProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
