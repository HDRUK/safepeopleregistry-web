import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import PageSection from "./PageSection";

const renderTest = () => render(<PageSection heading="This is a heading" />);

describe("<PageSection />", () => {
  it("Has the correct content", async () => {
    renderTest();

    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toHaveTextContent("This is a heading");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
