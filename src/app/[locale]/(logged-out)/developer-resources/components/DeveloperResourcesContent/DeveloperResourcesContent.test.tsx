import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import DeveloperResourcesContent from "./DeveloperResourcesContent";

jest.mock("next-intl/server");
jest.mock("@/data/store");

describe("<DeveloperResourcesContent />", () => {
  it("renders the intro paragraph", async () => {
    const Component = await DeveloperResourcesContent();
    render(Component);
    expect(
      screen.getByText(/lets you integrate directly with our platform/i)
    ).toBeInTheDocument();
  });

  it("renders the heading", async () => {
    const Component = await DeveloperResourcesContent();
    render(Component);
    expect(
      screen.getByRole("heading", { name: /developer resources/i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const Component = await DeveloperResourcesContent();
    commonAccessibilityTests(render(Component));
  });
});
