import Link from "next/link";
import Form from "./form";
import HowToUse from "./how-to-use";
import Results from "./results";

export default function Home() {
  return (
    <>
      <main className="antialiased flex w-full sm:max-w-2xl mx-auto flex-col items-center justify-between pt-24 px-8">
        <div className="mb-8 text-xl text-center tracking-wide font-semibold">
          <h1 className="text-5xl font-bold tracking-normal">
            YNAB Monthly Recap Tool
          </h1>
          <p className="text-3xl mb-2">
            A tool to generate recap reports based on YNAB transactions csv.
          </p>
          <p>
            This tool will work perfectly when you set a flag for each of your
            spending transactions. This tool does not process inflow, only
            outflow (expenses, spending, etc)
          </p>
        </div>
        <Form />
        <HowToUse />
        <Results />
      </main>
      <footer className="antialiased flex max-w-2xl mx-auto flex-col items-center justify-between p-24">
        <Link
          href={"https://qwerqy.com"}
          className="text-2xl font-medium underline"
        >
          qwerqy.com
        </Link>
      </footer>
    </>
  );
}
