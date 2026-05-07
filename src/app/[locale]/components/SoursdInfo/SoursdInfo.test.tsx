import { render, screen } from "@testing-library/react";
import SoursdInfo from "./SoursdInfo";

// Mock next-intl
jest.mock("next-intl/server", () => ({
  getTranslations: async () => {
    return (key: string) => {
      const translations: Record<string, string> = {
        infoTitle: "Safe People Registry",
        info: "Mocked homepage info",
      };

      return translations[key];
    };
  },
}));

describe("SoursdInfo Component", () => {
  it("renders the mocked homepage info", async () => {
    const Component = await SoursdInfo();

    render(Component);

    expect(screen.getByText("Safe People Registry")).toBeInTheDocument();

    expect(screen.getByText("Mocked homepage info")).toBeInTheDocument();
  });
});
