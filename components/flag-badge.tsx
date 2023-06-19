import { flags } from "@utils/consts";
import { FLAG } from "@utils/types";

export const FlagBadge = ({ flag }: { flag?: FLAG }) => {
  return (
    <div className="relative z-10  before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-black ">
      <div
        className={`relative z-10 px-2 py-1 text-md text-white font-bold ${
          flags.find((d) => d.label === flag)?.bgColor
        }`}
      >
        {flag}
      </div>
    </div>
  );
};
