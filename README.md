## YNAB Monthly Recap Tool

### Overview

A tool to generate recap reports based on YNAB transactions csv.
The following reports will be generated:

- All transactions table
- Total outflow per categories
- Total outflow per flags

This tool will work perfectly when you set a flag for each of your spending transactions. This tool does not process inflow, only outflow (expenses, spending, etc)

Personally I have been using YNAB since 2018. I have always find zero-based budgeting to be awesome and fits my budgeting style. However, I still need a way to

- Plan out how I should spend the next month.
- Revisit my spendings from the past (weeks/months/years)

This project is built with NextJS 13.4 with the App Router. Styling by TailwindCSS.

### How to use

1. In YNAB, go to All Accounts, select the transactions you want to export.
2. Click the title of your budget on the top left of the screen, and click export selected transactions.
3. In the dashboard, upload the CSV file and click submit.
4. All your data will be shown.
