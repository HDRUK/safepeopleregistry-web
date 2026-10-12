import { useFeatures } from "@/components/FeatureProvider";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "@/utils/testUtils";
import Sro from "./Sro";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

jest.mock("./SroForm", () => ({
  __esModule: true,
  default: ({ isDelegate }: { isDelegate: boolean }) => (
    <div>SroForm content{isDelegate ? " as delegate" : " as sro"}</div>
  ),
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

    expect(screen.getByText(/SroForm content/)).toBeInTheDocument();
    expect(screen.queryByText("SroInvite content")).not.toBeInTheDocument();
  });

  it("renders SroInvite when the SRO requirement feature is disabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: false,
    });

    render(<Sro />);

    expect(screen.getByText("SroInvite content")).toBeInTheDocument();
    expect(screen.queryByText(/SroForm content/)).not.toBeInTheDocument();
  });

  it.each([
    { label: "sro only", is_sro: true, is_delegate: 0, expected: "as sro" },
    {
      label: "sro and delegate",
      is_sro: true,
      is_delegate: 1,
      expected: "as sro",
    },
    {
      label: "delegate only",
      is_sro: false,
      is_delegate: 1,
      expected: "as delegate",
    },
    {
      label: "neither flag",
      is_sro: false,
      is_delegate: 0,
      expected: "as delegate",
    },
  ])(
    "renders SroForm $expected for a user with $label",
    ({ is_sro, is_delegate, expected }) => {
      (useFeatures as jest.Mock).mockReturnValue({
        isSroRequirementEnabled: true,
      });
      mockUseStore({
        getUser: () =>
          mockedUser({
            user_group: UserGroup.ORGANISATIONS,
            organisation_id: 1,
            is_sro,
            is_delegate,
          }),
      });

      render(<Sro />);

      expect(
        screen.getByText(`SroForm content ${expected}`)
      ).toBeInTheDocument();
    }
  );
});
