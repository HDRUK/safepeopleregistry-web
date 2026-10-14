import { useFeatures } from "@/components/FeatureProvider";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "@/utils/testUtils";
import SsoTenants from "./SsoTenants";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

jest.mock("@/organisms/SsoTenantsSubmission", () => ({
  __esModule: true,
  default: () => <div>SsoTenantsSubmission content</div>,
}));

const DELEGATE_NOTICE =
  "Only your organisation's primary admin can request or manage SSO connections.";

describe("<SsoTenants />", () => {
  beforeEach(() => {
    (useFeatures as jest.Mock).mockReturnValue({
      isEnterpriseSamlSsoEnabled: true,
    });
  });

  it.each([
    { label: "sro only", is_sro: true, is_delegate: 0, canManage: true },
    {
      label: "sro and delegate",
      is_sro: true,
      is_delegate: 1,
      canManage: true,
    },
    { label: "delegate only", is_sro: false, is_delegate: 1, canManage: false },
    { label: "neither flag", is_sro: false, is_delegate: 0, canManage: false },
  ])(
    "only lets the SRO manage SSO connections ($label)",
    ({ is_sro, is_delegate, canManage }) => {
      mockUseStore({
        getUser: () =>
          mockedUser({
            user_group: UserGroup.ORGANISATIONS,
            organisation_id: 1,
            is_sro,
            is_delegate,
          }),
      });

      render(<SsoTenants />);

      if (canManage) {
        expect(
          screen.getByText("SsoTenantsSubmission content")
        ).toBeInTheDocument();
        expect(screen.queryByText(DELEGATE_NOTICE)).not.toBeInTheDocument();
      } else {
        expect(screen.getByText(DELEGATE_NOTICE)).toBeInTheDocument();
        expect(
          screen.queryByText("SsoTenantsSubmission content")
        ).not.toBeInTheDocument();
      }
    }
  );
});
