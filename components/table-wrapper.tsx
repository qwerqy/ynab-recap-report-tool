import { HTMLProps } from "react";
import cn from "classnames";

export const TableWrapper: React.FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div className="w-full  mb-10 relative z-10  before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black">
    <div
      className={cn([
        "relative z-10 w-full h-full max-h-96 border-2 border-black bg-white overflow-auto",
        className,
      ])}
    >
      {children}
    </div>
  </div>
);
