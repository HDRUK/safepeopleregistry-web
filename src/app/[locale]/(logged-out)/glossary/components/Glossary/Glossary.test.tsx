import { render, screen } from "@testing-library/react";
import Glossary from "./Glossary";

// Mock next-intl
jest.mock("next-intl/server", () => ({
  getTranslations: async () => {
    return (key: string) => {
      const translations: Record<string, string> = {
        title: "Glossary",
      };

      return translations[key];
    };
  },
}));

describe("Glossary Component", () => {
  it("renders the glossary title", async () => {
    const Component = await Glossary();

    render(Component);

    expect(screen.getByText("Glossary")).toBeInTheDocument();
  });
});
