import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { UserGroup } from "@/consts/user";
import links from "@/consts/links";
import GetInvolvedCards from "./GetInvolvedCards";

jest.mock("@/data/store");

describe("<GetInvolvedCards />", () => {
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

  it("uses loggedOut hrefs when no user is in the store", () => {
    mockUseStore({ config: { user: undefined } } as never);
    render(<GetInvolvedCards />);

    const anchorElements = screen.getAllByRole("link");
    const hrefs = anchorElements.map(l => l.getAttribute("href"));
    expect(hrefs).toContain(links.getInvolved.mailingList);
    expect(hrefs).toContain(links.getInvolved.survey);
    expect(hrefs).toContain(links.getInvolved.feedback);
  });

  it("uses user-group-specific href for the feedback card when user is USERS", () => {
    mockUseStore({
      config: { user: { user_group: UserGroup.USERS } },
    } as never);
    render(<GetInvolvedCards />);

    const feedbackLink = screen
      .getAllByRole("link")
      .find(l => l.getAttribute("href") === links.getInvolved.surveyUser);
    expect(feedbackLink).toBeInTheDocument();
  });

  it("uses custodian-specific href for the feedback card when user is CUSTODIANS", () => {
    mockUseStore({
      config: { user: { user_group: UserGroup.CUSTODIANS } },
    } as never);
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
