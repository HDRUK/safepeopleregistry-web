import { formatDisplayShortDate, formatShortDate, isExpired } from "./date";

describe("Date utils", () => {
  describe("isExpired", () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
    });

    it("not expired", async () => {
      expect(isExpired("2021-01-01")).toEqual(true);
    });

    it("expired", async () => {
      expect(isExpired("2019-01-01")).toEqual(false);
    });
  });

  describe("formatShortDate", () => {
    it("date has the correct format", async () => {
      expect(formatShortDate("2021-01-01")).toEqual("1 Jan 2021");
    });
  });

  describe("formatDisplayShortDate", () => {
    it("date has the correct format", async () => {
      expect(formatDisplayShortDate("2021-01-01")).toEqual("Jan 2021");
    });
  });
});
