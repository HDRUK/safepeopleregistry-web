import { render, screen } from "@testing-library/react";
import Support from "./Support";

// Mock next-intl
jest.mock("next-intl/server", () => ({
  getTranslations: async () => {
    const translations: Record<string, string> = {
      supportTitle: "Support",
      supportUsers: "Users",
      supportOrganisations: "Organisations",
      supportCustodians: "Data Custodians",
      supportUsersInfo: "User info",
      supportOrganisationsInfo: "Organisation info",
      supportCustodiansInfo: "Custodian info",
    };

    const t = (key: string) => translations[key];

    t.rich = (key: string) => translations[key];

    return t;
  },
}));

describe("Support Component", () => {
  it("renders the support heading", async () => {
    const Component = await Support();

    render(Component);

    expect(
      screen.getByRole("heading", { name: /support/i })
    ).toBeInTheDocument();
  });

  it("renders all support sections", async () => {
    const Component = await Support();

    render(Component);

    expect(screen.getByText("Users")).toBeInTheDocument();

    expect(screen.getByText("Organisations")).toBeInTheDocument();

    expect(screen.getByText("Data Custodians")).toBeInTheDocument();
  });

  it("renders all support images", async () => {
    const Component = await Support();

    render(Component);

    expect(screen.getByAltText("User support")).toBeInTheDocument();

    expect(screen.getByAltText("Organisation support")).toBeInTheDocument();

    expect(screen.getByAltText("Data Custodian support")).toBeInTheDocument();
  });
});
