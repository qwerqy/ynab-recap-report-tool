export type Transaction = {
  account: string;
  flag: FLAG;
  date: string;
  payee: string;
  categoryGroup: string;
  category: string;
  memo: string;
  outflow: number;
  cleared: string;
};

export enum FLAG {
  SHOULDNT_HAVE = "Shouldn't have",
  NICE_TO_HAVE = "Nice to have",
  NEED_TO_HAVE = "Need to have",
  ESSENTIAL = "Essential",
}
