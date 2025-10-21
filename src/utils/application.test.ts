import {
  mockedFormattedSystemConfig,
  mockedSystemConfig,
} from "@/mocks/data/systemConfig";
import { getName, parseSystemConfig } from "./application";
import { mockedUser } from "@/mocks/data/user";

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
});
