"use client";

import AllTransactionsTable from "./all-transactions-table";
import CategoriesPivotTable from "./categories-pivot-table";
import FlagsPivotTable from "./flags-pivot-table";
import { useTransaction } from "./provider";

const Results = () => {
  const { resultsRef } = useTransaction();

  return (
    <div ref={resultsRef}>
      <AllTransactionsTable />
      <CategoriesPivotTable />
      <FlagsPivotTable />
    </div>
  );
};

export default Results;
