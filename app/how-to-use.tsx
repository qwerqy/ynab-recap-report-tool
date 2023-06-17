const steps = [
  "In YNAB, go to All Accounts, select the transactions you want to export.",
  "Click the title of your budget on the top left of the screen, and click export selected transactions.",
  "In the dashboard, upload the CSV file and click submit.",
];

const HowToUse = () => (
  <div className="mb-10">
    <h2 className="text-4xl font-bold">How to use</h2>
    <ol className="list-decimal text-lg font-medium">
      {steps.map((step, idx) => (
        <li key={idx}>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default HowToUse;
