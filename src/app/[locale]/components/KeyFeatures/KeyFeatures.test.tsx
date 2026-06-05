import { screen } from "@testing-library/react";
import { render } from "@/utils/testUtils";
import KeyFeatures from "./KeyFeatures";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(),
}));

import { getTranslations } from "next-intl/server";

describe("KeyFeatures Component", () => {
  beforeEach(() => {
    const map: Record<string, string> = {
      keyFeature1Title: "User and Organisation Registers",
      keyFeature1Info: "Feature 1 description",
      keyFeature2Title: "Visibility across Data Custodians",
      keyFeature2Info: "Feature 2 description",
      keyFeature3Title: "Multiple authentication routes",
      keyFeature3Info: "Feature 3 description",
    };
    const t = (key: string) => map[key] ?? key;
    t.rich = (key: string) => map[key] ?? key;
    (getTranslations as jest.Mock).mockResolvedValue(t);
  });

  it("renders the main headings", async () => {
    render(await KeyFeatures());

    expect(
      screen.getByRole("heading", {
        name: /User and Organisation Registers/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Visibility across Data Custodians/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Multiple authentication routes/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all feature descriptions", async () => {
    render(await KeyFeatures());

    expect(screen.getByText("Feature 1 description")).toBeInTheDocument();
    expect(screen.getByText("Feature 2 description")).toBeInTheDocument();
    expect(screen.getByText("Feature 3 description")).toBeInTheDocument();
  });
});
