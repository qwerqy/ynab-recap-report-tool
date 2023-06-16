import { Transaction } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "papaparse";
// import { auth } from "../../lib/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Parse CSV
    try {
      //   const user = await auth.verifyIdToken(req.cookies.auth);
      const csv = req.body;
      const csvData = parse<string[]>(csv, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: true,
        transform: (value) => {
          //   If value matches Content-, do not return
          if (value.match(/Content-/)) {
            return;
          }

          // If value matches sequence of '-' and 'numbers', do not return
          if (value.match(/-\d+/)) {
            return;
          }

          return value.trim();
        },
      });

      const data = csvData.data
        .map((row) => {
          //   If row is undefined, return
          if (!row) {
            return;
          }

          // If row is an array of undefined, return
          if (row.every((element) => element === undefined)) {
            return;
          }

          // If row is an array of null, return
          if (row.every((element) => element === null)) {
            return;
          }

          // If row is an array of empty strings, return
          if (row.every((element) => element === "")) {
            return;
          }

          return row;
        })
        .filter(Boolean);

      const [keys, ...values] = data;

      const transactions: Transaction[] = values.map((row) => {
        const transaction = keys?.reduce((object, key, index) => {
          return { ...object, [key.toLowerCase()]: row?.[index] };
        }, {} as any);

        return {
          account: transaction.account,
          flag: transaction.flag,
          date: transaction.date,
          payee: transaction.payee,
          categoryGroup: transaction["category group"],
          category: transaction.category,
          memo: transaction.memo,
          outflow: transaction.outflow,
          cleared: transaction.cleared,
        };
      });

      res.status(200).json({ transactions });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}