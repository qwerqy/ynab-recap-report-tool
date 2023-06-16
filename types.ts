export type Transaction = {
  account: string;
  flag: string;
  date: Date;
  payee: string;
  categoryGroup: string;
  category: string;
  memo: string;
  outflow: number;
  cleared: string;
};
