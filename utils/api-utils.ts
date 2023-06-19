import { Transaction } from "@utils/types";

export const cleanCSVData = (data: string[][]): (string[] | undefined)[] => {
  return data
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
};

export const convertCSVToJSON = (
  data: (string[] | undefined)[]
): Transaction[] => {
  if (data.every((row) => row === undefined)) {
    return [];
  }

  const [keys, ...values] = data;

  return values.map((row) => {
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
      outflow: Number(transaction.outflow.replace(/[^0-9.-]+/g, "")),
      cleared: transaction.cleared,
    };
  });
};
