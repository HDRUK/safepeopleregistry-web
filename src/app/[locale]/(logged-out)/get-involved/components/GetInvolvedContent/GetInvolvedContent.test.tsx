import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import GetInvolvedContent from "./GetInvolvedContent";

jest.mock("next-intl/server");
jest.mock("@/data/store");

describe("<GetInvolvedContent />", () => {
  it("renders the intro paragraphs", async () => {
    const Component = await GetInvolvedContent();
    render(Component);
    expect(
      screen.getByText(/The Safe People Registry was created/i)
    ).toBeInTheDocument();
  });

  it("renders the acknowledgement heading", async () => {
    const Component = await GetInvolvedContent();
    render(Component);
    expect(
      screen.getByRole("heading", { name: /acknowledgement/i })
    ).toBeInTheDocument();
  });

  it("renders all four partner logos", async () => {
    const Component = await GetInvolvedContent();
    render(Component);
    expect(
      screen.getByAltText("UK Health Data Research Alliance")
    ).toBeInTheDocument();
    expect(screen.getByAltText("NHS England")).toBeInTheDocument();
    expect(
      screen.getByAltText("UK Trusted Research Environment Community")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Health Data Research UK")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const Component = await GetInvolvedContent();
    commonAccessibilityTests(render(Component));
  });
});
