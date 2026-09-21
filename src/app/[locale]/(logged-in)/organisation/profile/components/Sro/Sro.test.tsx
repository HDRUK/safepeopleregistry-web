import { useFeatures } from "@/components/FeatureProvider";
import { render, screen } from "@/utils/testUtils";
import Sro from "./Sro";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

jest.mock("./SroForm", () => ({
  __esModule: true,
  default: () => <div>SroForm content</div>,
}));

jest.mock("./SroInvite", () => ({
  __esModule: true,
  default: () => <div>SroInvite content</div>,
}));

describe("<Sro />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders SroForm when the SRO requirement feature is enabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: true,
    });

    render(<Sro />);

    expect(screen.getByText("SroForm content")).toBeInTheDocument();
    expect(screen.queryByText("SroInvite content")).not.toBeInTheDocument();
  });

  it("renders SroInvite when the SRO requirement feature is disabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: false,
    });

    render(<Sro />);

    expect(screen.getByText("SroInvite content")).toBeInTheDocument();
    expect(screen.queryByText("SroForm content")).not.toBeInTheDocument();
  });
});
