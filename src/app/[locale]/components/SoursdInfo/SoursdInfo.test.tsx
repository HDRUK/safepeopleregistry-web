import React from "react";
import { render, screen } from "@testing-library/react";
import SoursdInfo from "./SoursdInfo";

// Mocking the styles module
jest.mock("./SoursdInfo.styles", () => ({
  StyledContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-content">{children}</div>
  ),
}));

describe("SoursdInfo Component", () => {
  it("renders the mocked homepage info", () => {
    render(<SoursdInfo />);

    // Assert the mocked info is displayed
    expect(screen.getByTestId("styled-content")).toHaveTextContent(
      "Safe People RegistryA platform to enable ‘Safe People’ decision making"
    );
  });
});
