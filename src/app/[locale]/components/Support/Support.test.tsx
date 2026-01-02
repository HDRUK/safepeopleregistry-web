import { render, screen } from "@testing-library/react";
import Support from "./Support";

describe("Support Component", () => {
  it("renders the Support heading", () => {
    render(<Support />);
    const heading = screen.getByRole("heading", { name: /support/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders all buttons with correct text", () => {
    render(<Support />);
    const individualLink = screen.getByRole("link", {
      name: /individual users/i,
    });
    const organisationLink = screen.getByRole("link", {
      name: /organisations/i,
    });
    const custodianLink = screen.getByRole("link", {
      name: /data custodians/i,
    });

    expect(individualLink).toBeInTheDocument();
    expect(organisationLink).toBeInTheDocument();
    expect(custodianLink).toBeInTheDocument();
  });

  it("ensures buttons have correct styling", () => {
    render(<Support />);
    const custodianLink = screen.getByRole("link", {
      name: /data custodians/i,
    });

    // Mocked test to check the primary button style
    expect(custodianLink).toHaveClass("MuiButton-outlinedPrimary"); // Check for Material-UI styles
  });
});
