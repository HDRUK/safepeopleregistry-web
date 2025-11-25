import {
  mockedFormattedSystemConfig,
  mockedSystemConfig,
} from "@/mocks/data/systemConfig";
import { mockedUser } from "@/mocks/data/user";
import {
  getAbbreviatedListWithCount,
  getName,
  parseSystemConfig,
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
});
