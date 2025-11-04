import { anyIncludes, capitaliseFirstLetter, toSentenceCase } from "./string";

describe("capitaliseFirstLetter", () => {
  test("should capitalise the first letter of a single word", () => {
    const input = "hello";
    const output = "Hello";
    expect(capitaliseFirstLetter(input)).toBe(output);
  });

  test("should not change a word that already starts with an uppercase letter", () => {
    const input = "World";
    const output = "World";
    expect(capitaliseFirstLetter(input)).toBe(output);
  });

  test("should handle an empty string", () => {
    const input = "";
    const output = "";
    expect(capitaliseFirstLetter(input)).toBe(output);
  });

  test("should capitalise the first letter and keep the rest of the string unchanged", () => {
    const input = "javaScript";
    const output = "JavaScript";
    expect(capitaliseFirstLetter(input)).toBe(output);
  });
});

describe("toSentenceCase", () => {
  it("should convert a lowercase string to sentence case", () => {
    const result = toSentenceCase("hello world. this is a test! goodbye");
    expect(result).toEqual("Hello world. This is a test! Goodbye");
  });
});

describe("anyIncludes", () => {
  it("finds the conditon", () => {
    const results = anyIncludes("users", ["users", "organisations"]);

    expect(results).toEqual(true);
  });

  test("doesn't the conditon", () => {
    const results = anyIncludes("custodian", ["users", "organisations"]);

    expect(results).toEqual(false);
  });
});
