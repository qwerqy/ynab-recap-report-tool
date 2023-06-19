import { FLAG } from "@utils/types";

export const flags = [
  { label: FLAG.SHOULDNT_HAVE, bgColor: "bg-red-500" },
  { label: FLAG.NICE_TO_HAVE, bgColor: "bg-orange-500" },
  { label: FLAG.NEED_TO_HAVE, bgColor: "bg-yellow-500" },
  { label: FLAG.ESSENTIAL, bgColor: "bg-green-500" },
] as const;
