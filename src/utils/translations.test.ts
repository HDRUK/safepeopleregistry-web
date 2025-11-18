import { getTranslationWithFallback } from "./translations";

const t = (key: string) => {
  const translations = {
    "ProjectsAddUserModal.inivtedUserMessage": "Success",
  };

  if (!translations[key]) return key;

  return translations[key];
};

describe("Translations utils", () => {
  describe("getTranslationWithFallback", () => {
    it("handles existing translations", async () => {
      expect(
        getTranslationWithFallback(t, "ProjectsAddUserModal.inivtedUserMessage")
      ).toEqual("Success");
    });

    it("handles non existent translations", async () => {
      expect(
        getTranslationWithFallback(t, "ProjectsAddUserModal.invalid")
      ).toEqual(null);
    });

    it("handles a fallbck", async () => {
      expect(
        getTranslationWithFallback(t, "ProjectsAddUserModal.invalid", "Failure")
      ).toEqual("Failure");
    });
  });
});
