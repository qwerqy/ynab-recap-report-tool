import { cleanCSVData, convertCSVToJSON } from "@utils/api-utils";

describe("Utils", () => {
  describe("cleanCSVData", () => {
    // Test cleanCSVData with mock csv and return expected data
    it("should return expected data", () => {
      const mockCSV = [
        ["", "", ""],
        ["", "test", ""],
        ["test", "test", "test"],
      ];

      const expected = [
        ["", "test", ""],
        ["test", "test", "test"],
      ];

      const actual = cleanCSVData(mockCSV);

      expect(actual).toEqual(expected);
    });
  });

  describe("convertCSVToJSON", () => {
    // Test convertCSVToJSON with mock csv and return expected data
    it("should return expected data", () => {
      const expected = [
        {
          account: "test",
          category: "test",
          categoryGroup: undefined,
          cleared: undefined,
          date: "test",
          flag: "test",
          memo: "test",
          outflow: 0,
          payee: "test",
        },
        {
          account: "test",
          category: "test",
          categoryGroup: undefined,
          cleared: undefined,
          date: "test",
          flag: "test",
          memo: "test",
          outflow: 0,
          payee: "test",
        },
      ];

      const mockCSV = [
        [
          "Account",
          "Flag",
          "Date",
          "Payee",
          "Category",
          "Memo",
          "Outflow",
          "Inflow",
        ],
        ["test", "test", "test", "test", "test", "test", "test", "test"],
        ["test", "test", "test", "test", "test", "test", "test", "test"],
      ];

      const actual = convertCSVToJSON(mockCSV);

      expect(actual).toEqual(expected);
    });
  });
});
