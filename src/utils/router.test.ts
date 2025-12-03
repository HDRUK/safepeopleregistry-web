import { UserGroup } from "@/consts/user";
import { needsLoggedInPermissions } from "./router";

describe("needsLoggedInPermissions", () => {
  it("handles needed permissions", async () => {
    const result = needsLoggedInPermissions(
      [
        {
          path: "/admin",
          permissions: [UserGroup.ADMINS],
        },
      ],
      "/admin"
    );

    expect(result).toEqual(true);
  });

  it("handles no permissions", async () => {
    const result = needsLoggedInPermissions(
      [
        {
          path: "/admin",
        },
      ],
      "/admin"
    );

    expect(result).toEqual(false);
  });
});
