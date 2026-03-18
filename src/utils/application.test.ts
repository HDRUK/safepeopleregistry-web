import { Status } from "@/consts/application";
import {
  mockedFormattedSystemConfig,
  mockedSystemConfig,
} from "@/mocks/data/systemConfig";
import { mockedUser } from "@/mocks/data/user";
import {
  getAbbreviatedListWithCount,
  getName,
  parseSystemConfig,
  sortStatusArray,
} from "./application";

describe("Application utils", () => {
  describe("parseSystemConfig", () => {
    it("returns the correct formatted object", async () => {
      expect(parseSystemConfig(mockedSystemConfig())).toEqual(
        mockedFormattedSystemConfig()
      );
    });

    it("returns an empty object", async () => {
      expect(parseSystemConfig(undefined)).toEqual({});
    });
  });

  describe("getName", () => {
    it("returns the correct name", async () => {
      const user = mockedUser();

      expect(getName(user)).toEqual(`${user.first_name} ${user.last_name}`);
    });
  });

  describe("getAbbreviatedListWithCount", () => {
    it("returns the correct count and items", async () => {
      const result = getAbbreviatedListWithCount(["item1", "item2"], 1);

      expect(result).toEqual({
        count: 1,
        items: ["item1"],
      });
    });
  });

  describe("sortStatusArray", () => {
    it("sorts statuses based on STATUS_ORDER_MAP", () => {
      const input = [
        Status.MORE_USER_INFO_REQ,
        Status.SYSTEM_APPROVAL,
        Status.AFFILIATION_EMAIL_VERIFY,
      ];

      const result = sortStatusArray(input);

      expect(result).toEqual([
        Status.SYSTEM_APPROVAL,
        Status.AFFILIATION_EMAIL_VERIFY,
        Status.MORE_USER_INFO_REQ,
      ]);
    });

    it("puts unknown statuses at the end", () => {
      const input = [
        "UNKNOWN",
        Status.SYSTEM_APPROVAL,
        Status.MORE_USER_INFO_REQ,
      ];

      const result = sortStatusArray(input);

      expect(result).toEqual([
        Status.SYSTEM_APPROVAL,
        Status.MORE_USER_INFO_REQ,
        "UNKNOWN",
      ]);
    });

    it("returns empty array when given empty array", () => {
      expect(sortStatusArray([])).toEqual([]);
    });
  });
});
