import Form from "./form";
import AllTransactionsTable from "./all-transactions-table";
import CategoriesPivotTable from "./categories-pivot-table";
import FlagsPivotTable from "./flags-pivot-table";

export default function Home() {
  return (
    <main className="flex max-w-2xl mx-auto flex-col items-center justify-between p-24">
      <Form />
      <AllTransactionsTable />
      <CategoriesPivotTable />
      <FlagsPivotTable />
    </main>
  );
}
