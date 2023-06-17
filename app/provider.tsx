"use client";

import { Transaction } from "@types";
import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

export const TransactionContext = createContext<{
  transactions: Transaction[];
  setTransactions: (v: Transaction[]) => void;
  resultsRef: MutableRefObject<any>;
} | null>(null);

export const useTransaction = () => {
  const transactionsObj = useContext(TransactionContext);
  if (!transactionsObj) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return transactionsObj;
};

export const TransactionProvider = ({ children }: PropsWithChildren) => {
  const resultsRef = useRef(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions, resultsRef }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
