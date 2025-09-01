import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import KeyFeatures from "./KeyFeatures";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("KeyFeatures Component", () => {
  beforeEach(() => {
    const mockT = jest.fn().mockReturnValue("TEST");
    (useTranslations as jest.Mock).mockReturnValue(mockT);
  });

  it("renders the main headings", () => {
    render(<KeyFeatures />);

    // Check the main heading
    expect(
      screen.getByRole("heading", { name: /Key Features/i })
    ).toBeInTheDocument();

    // Check the subheading
    expect(
      screen.getByText(
        /Capabilities for Users, Organisations, and Data Custodians/i
      )
    ).toBeInTheDocument();
  });

  it("renders all cards", () => {
    render(<KeyFeatures />);

    // Check the first item
    expect(
      screen.getByRole("heading", { name: /User and Organisation Registers/i })
    ).toBeInTheDocument();

    // Check the second item
    expect(
      screen.getByRole("heading", {
        name: /Visibility across Data Custodians/i,
      })
    ).toBeInTheDocument();

    // Check the third item
    expect(
      screen.getByRole("heading", {
        name: /Multiple authentication routes/i,
      })
    ).toBeInTheDocument();
  });
});
