import { Transaction } from "@utils/types";
import { cleanCSVData, convertCSVToJSON } from "@utils/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "papaparse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Parse CSV
    try {
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

          // If value includes 'WebKitFormBoundary', do not return
          if (value.includes("WebKitFormBoundary")) {
            return;
          }

          // If value matches sequence of '-' and 'numbers', do not return
          if (value.match(/-\d+/)) {
            return;
          }

          return value.trim();
        },
      });

      const data = cleanCSVData(csvData.data);

      const transactions: Transaction[] = convertCSVToJSON(data);

      res.status(200).json({ transactions });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
