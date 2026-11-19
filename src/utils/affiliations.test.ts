import { isVerificationCode } from "@/utils/affiliations";

describe("isVerificationCode", () => {
  it("accepts a verification code", () => {
    expect(isVerificationCode("6f1c1c9e-4b6e-4c1a-9a43-2d7c1e0b5f10")).toBe(
      true
    );
  });

  it.each([
    ["nothing", undefined],
    ["an empty value", ""],
    ["a value that isn't a code", "not-a-code"],
    [
      "a code with extra characters",
      "6f1c1c9e-4b6e-4c1a-9a43-2d7c1e0b5f10/../x",
    ],
    ["a list of values", ["6f1c1c9e-4b6e-4c1a-9a43-2d7c1e0b5f10"]],
  ])("rejects %s", (_, value) => {
    expect(isVerificationCode(value)).toBe(false);
  });
});
