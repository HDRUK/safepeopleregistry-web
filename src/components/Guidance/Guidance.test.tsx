import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import Guidance, { GuidanceProps } from "./Guidance";

const renderGuidance = (props?: Partial<GuidanceProps>) => {
  return render(
    <Guidance infoTitle="Guidance" info="Sample content" {...props}>
      Panel
    </Guidance>
  );
};

const renderClosedGuidance = () => {
  const result = renderGuidance();

  const trigger = screen.getByRole("button", {
    expanded: true,
  });

  fireEvent.click(trigger);

  return result;
};

describe("<Guidance />", () => {
  it("shows the correct content", async () => {
    renderGuidance();

    const title = screen.getByRole("heading", {
      level: 3,
    });

    expect(title.textContent).toEqual("Guidance");
    expect(screen.getByText("Sample content")).toBeInTheDocument();
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("is open by default", async () => {
    const { container } = renderGuidance();

    const trigger = screen.getByRole("button");
    const info = container.querySelector("section");

    if (info && trigger) {
      expect(info).toBeControlledBy(trigger);
    }
  });

  it("closes the guidance", async () => {
    renderClosedGuidance();

    await waitFor(() => {
      const trigger = screen.getByRole("button", {
        expanded: false,
      });

      expect(trigger).toBeInTheDocument();
    });
  });

  it("opens the guidance", async () => {
    renderClosedGuidance();

    let trigger = screen.getByRole("button", {
      expanded: false,
    });

    fireEvent.click(trigger);

    await waitFor(() => {
      trigger = screen.getByRole("button", {
        expanded: true,
      });

      expect(trigger).toBeInTheDocument();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderGuidance());
  });
});
