const steps = [
  "In YNAB, go to All Accounts, set the desired View, usually I would set a month.",
  "Set each transaction with a flag.",
  "Once you've set a flag for each transaction, select all transactions.",
  "Click the title of your budget on the top left of the screen, and click export selected transactions.",
  "In the dashboard, upload the CSV file and click submit.",
];

const flags = [
  { label: "Shouldn't have", bgColor: "bg-red-500" },
  { label: "Nice to have", bgColor: "bg-orange-500" },
  { label: "Need to have", bgColor: "bg-yellow-500" },
  { label: "Essential", bgColor: "bg-green-500" },
];

const HowToUse = () => (
  <div className="mb-10 flex flex-col gap-4">
    <div>
      <h2 className="text-4xl font-bold">How to use</h2>
      <ol className="list-decimal text-lg font-medium">
        {steps.map((step, idx) => (
          <li key={idx}>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </div>
    <div>
      <h3 className="text-3xl font-bold">Example</h3>
      <div className="text-lg font-medium">
        <p>Try this tool now with an example CSV.</p>
        <a href="/example.csv" download className="underline text-xl">
          example.csv
        </a>
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-bold mb-2">Flags I use</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        {flags.map((flag, idx) => (
          <div
            key={idx}
            className="relative z-10  before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black "
          >
            <div
              className={`relative z-10 px-4 py-1 text-lg text-white font-bold ${flag.bgColor}`}
            >
              {flag.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowToUse;
