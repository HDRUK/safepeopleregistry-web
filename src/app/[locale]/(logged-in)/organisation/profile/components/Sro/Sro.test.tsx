import { useFeatures } from "@/components/FeatureProvider";
import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { render, screen } from "@/utils/testUtils";
import Sro from "./Sro";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

jest.mock("@/queries/useOrganisationStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./SroForm", () => ({
  __esModule: true,
  default: ({
    isDelegate,
    hasSroAssigned,
  }: {
    isDelegate: boolean;
    hasSroAssigned: boolean;
  }) => (
    <div>
      SroForm content{isDelegate ? " as delegate" : " as sro"}
      <span>{hasSroAssigned ? "SRO assigned" : "No SRO assigned"}</span>
    </div>
  ),
}));

jest.mock("./SroDetailsPanel", () => ({
  __esModule: true,
  default: () => <div>SroDetailsPanel content</div>,
}));

const mockOrganisation = (
  organisation: Partial<ReturnType<typeof mockedOrganisation>>
) =>
  (useOrganisationStore as jest.Mock).mockReturnValue({
    organisation: mockedOrganisation(organisation),
  });

describe("<Sro />", () => {
  beforeEach(() => {
    (useOrganisationStore as jest.Mock).mockReturnValue({
      organisation: undefined,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders SroForm when the SRO requirement feature is enabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: true,
    });

    render(<Sro />);

    expect(screen.getByText(/SroForm content/)).toBeInTheDocument();
    expect(
      screen.queryByText("SroDetailsPanel content")
    ).not.toBeInTheDocument();
  });

  it("renders SroDetailsPanel when the SRO requirement feature is disabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: false,
    });

    render(<Sro />);

    expect(screen.getByText(/SroDetailsPanel content/)).toBeInTheDocument();
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

  it.each([
    { has_claimed_sro: true, expected: "SRO assigned" },
    { has_claimed_sro: false, expected: "No SRO assigned" },
    { has_claimed_sro: undefined, expected: "SRO assigned" },
  ])(
    "locks SroForm for delegates using has_claimed_sro ($has_claimed_sro)",
    ({ has_claimed_sro, expected }) => {
      (useFeatures as jest.Mock).mockReturnValue({
        isSroRequirementEnabled: true,
      });
      mockOrganisation({ has_claimed_sro, sro_officer: undefined });

      render(<Sro />);

      expect(screen.getByText(expected)).toBeInTheDocument();
    }
  );

  // SroDetailsPanel works out from the organisation whether to show the SRO, the invitee or the form.
  it("shows SroDetailsPanel when the SRO requirement is off", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isSroRequirementEnabled: false,
    });
    mockOrganisation({ has_claimed_sro: true, claimed_sro: mockedUser() });

    render(<Sro />);

    expect(screen.getByText("SroDetailsPanel content")).toBeInTheDocument();
  });
});
