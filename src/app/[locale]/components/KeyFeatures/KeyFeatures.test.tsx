import { screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { render } from "@/utils/testUtils";
import KeyFeatures from "./KeyFeatures";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("KeyFeatures Component", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const map: Record<string, string> = {
        keyFeature1Title: "User and Organisation Registers",
        keyFeature1Info: "Feature 1 description",
        keyFeature2Title: "Visibility across Data Custodians",
        keyFeature2Info: "Feature 2 description",
        keyFeature3Title: "Multiple authentication routes",
        keyFeature3Info: "Feature 3 description",
        registerNow: "Register now",
        or: "or",
        signIn: "Sign in",
      };

      return map[key] ?? key;
    });
  });

  it("renders the main headings", () => {
    render(<KeyFeatures />);

    expect(
      screen.getByRole("heading", { name: /User and Organisation Registers/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Visibility across Data Custodians/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Multiple authentication routes/i })
    ).toBeInTheDocument();
  });

  it("renders all feature descriptions", () => {
    render(<KeyFeatures />);

    expect(screen.getByText("Feature 1 description")).toBeInTheDocument();
    expect(screen.getByText("Feature 2 description")).toBeInTheDocument();
    expect(screen.getByText("Feature 3 description")).toBeInTheDocument();
  });
});
