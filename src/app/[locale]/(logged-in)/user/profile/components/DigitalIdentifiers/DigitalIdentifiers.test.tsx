import { useFeatures } from "@/components/FeatureProvider";
import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import DigitalIdentifiers from "./DigitalIdentifiers";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

jest.mock("../Identity/LinkedIdentities", () => ({
  __esModule: true,
  default: () => <div>LinkedIdentities content</div>,
}));

describe("<DigitalIdentifiers />", () => {
  it("renders linked identities alongside their guidance when enabled", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isLinkedIdentitiesEnabled: true,
    });

    render(<DigitalIdentifiers />);

    expect(
      screen.getByRole("heading", { name: "Digital identifiers" })
    ).toBeInTheDocument();
    expect(screen.getByText("LinkedIdentities content")).toBeInTheDocument();
    expect(
      screen.getByText("Why connect multiple identifiers?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Strengthen your profile with trusted professional identifiers/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Access your account using multiple trusted sign-in methods"
      )
    ).toBeInTheDocument();
  });

  it("links the previous and next buttons to the correct routes", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isLinkedIdentitiesEnabled: true,
    });

    render(<DigitalIdentifiers />);

    expect(screen.getByRole("link", { name: /Previous/i })).toHaveAttribute(
      "href",
      ROUTES.profileResearcherIdentity.path
    );
    expect(
      screen.getByRole("link", { name: /Save & Continue/i })
    ).toHaveAttribute("href", ROUTES.profileResearcherExperience.path);
  });
});
