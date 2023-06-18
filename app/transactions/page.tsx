import Link from "next/link";
import TransactionsTable from "./transactions-table";

export default function TransactionsPage() {
  return (
    <>
      <main className="antialiased flex w-full sm:max-w-6xl mx-auto flex-col items-center justify-between pt-24 px-8">
        <TransactionsTable />
        <Link
          href={"/"}
          className="underline font-bold text-xl flex gap-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Back</span>
        </Link>
      </main>
    </>
  );
}
