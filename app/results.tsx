"use client";

import { DataGrid } from "./DataGrid";
import AllTransactionsTable from "./all-transactions-table";
import CategoriesPivotTable from "./categories-pivot-table";
import FlagsPivotTable from "./flags-pivot-table";
import { useTransaction } from "./provider";

const Results = () => {
  const { resultsRef } = useTransaction();

  return (
    <div ref={resultsRef} className="max-w-full">
      <DataGrid />
      <AllTransactionsTable />
      <div className="flex gap-10">
        <CategoriesPivotTable />
        <FlagsPivotTable />
      </div>
    </div>
  );
};

export default Results;
