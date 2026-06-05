import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { UserGroup } from "@/consts/user";
import links from "@/consts/links";
import { useQuery } from "@tanstack/react-query";
import GetInvolvedCards from "./GetInvolvedCards";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

const mockMe = (userGroup?: UserGroup) =>
  mockUseQuery.mockReturnValue({
    data: userGroup ? { status: 200, data: { user_group: userGroup } } : null,
  } as never);

describe("<GetInvolvedCards />", () => {
  beforeEach(() => {
    mockMe();
  });

  it("renders all three cards", () => {
    render(<GetInvolvedCards />);
    expect(
      screen.getByRole("heading", { name: /mailing list/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /feedback/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /favourite features/i })
    ).toBeInTheDocument();
  });

  it("uses loggedOut hrefs when no user is returned", () => {
    render(<GetInvolvedCards />);

    const hrefs = screen.getAllByRole("link").map(l => l.getAttribute("href"));
    expect(hrefs).toContain(links.getInvolved.mailingList);
    expect(hrefs).toContain(links.getInvolved.survey);
    expect(hrefs).toContain(links.getInvolved.feedback);
  });

  it("uses user-group-specific href for the feedback card when user is USERS", () => {
    mockMe(UserGroup.USERS);
    render(<GetInvolvedCards />);

    const feedbackLink = screen
      .getAllByRole("link")
      .find(l => l.getAttribute("href") === links.getInvolved.surveyUser);
    expect(feedbackLink).toBeInTheDocument();
  });

  it("uses custodian-specific href for the feedback card when user is CUSTODIANS", () => {
    mockMe(UserGroup.CUSTODIANS);
    render(<GetInvolvedCards />);

    const custodianLink = screen
      .getAllByRole("link")
      .find(l => l.getAttribute("href") === links.getInvolved.surveyCustodian);
    expect(custodianLink).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<GetInvolvedCards />));
  });
});
