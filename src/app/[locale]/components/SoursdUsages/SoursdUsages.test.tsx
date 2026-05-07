import { screen } from "@testing-library/react";
import SoursdUsages from "./SoursdUsages";
import { render } from "@/utils/testUtils";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      usageInfo: "With Safe People Registry you can...",
      accelerateValidation: "Accelerate ‘Safe People’ data access",
      preventDuplication:
        "Reduce duplication of effort for Users and Organisations",
      easilyTrack: "Enable shared intelligence across Data Custodians",
    };

    return map[key] ?? key;
  },
}));

jest.mock("@/utils/framer", () => ({
  framerFadeIn: {},
}));

jest.mock("@mui/icons-material/FastForwardOutlined", () => () => (
  <svg data-testid="icon-fast" />
));

jest.mock("@mui/icons-material/RepeatOne", () => () => (
  <svg data-testid="icon-repeat" />
));

jest.mock("@mui/icons-material/Checklist", () => () => (
  <svg data-testid="icon-check" />
));

describe("SoursdUsages Component", () => {
  it("renders correctly", () => {
    render(<SoursdUsages />);

    expect(
      screen.getByText("With Safe People Registry you can...")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Accelerate ‘Safe People’ data access")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Reduce duplication of effort for Users and Organisations"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Enable shared intelligence across Data Custodians")
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-fast")).toBeInTheDocument();
    expect(screen.getByTestId("icon-repeat")).toBeInTheDocument();
    expect(screen.getByTestId("icon-check")).toBeInTheDocument();
  });
});
