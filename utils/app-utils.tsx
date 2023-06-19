import { flags } from "@utils/consts";
import { FLAG } from "@utils/types";
import { ReactNode } from "react";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

export const sortingConfig: Record<string, ReactNode> = {
  asc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="ml-1 w-4 h-4 inline-block"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  ),
  desc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="ml-1 w-4 h-4 inline-block"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  ),
};
