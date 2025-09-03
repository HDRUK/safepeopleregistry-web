import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import PageBody, { PageBodyProps } from "./PageBody";

const renderTest = (props?: PageBodyProps) => render(<PageBody {...props} />);

describe("<PageBody />", () => {
  it("shows the correct content", async () => {
    renderTest({
      heading: "This is a heading",
      description: "This is a description",
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toHaveTextContent("This is a heading");

    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
