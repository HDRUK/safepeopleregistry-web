import { UserHistoryLog } from "@/consts/user";
import { UserHistorys } from "@/services/users";
import { render, screen } from "@/utils/testUtils";
import { UserHistoryCard } from "./UserHistoryCard";

const leaver = { id: 2, first_name: "Jane", last_name: "Doe" };
const custodianUser = { id: 3, first_name: "John", last_name: "Smith" };

const mockHistory = (history: Partial<UserHistorys>): UserHistorys => ({
  id: 1,
  description: "",
  event: UserHistoryLog.UPDATED,
  log_name: "affiliation",
  properties: { old: {}, attributes: {} },
  created_at: "2026-11-04T10:00:00Z",
  updated_at: "2026-11-04T10:00:00Z",
  subject_type: "App\\Models\\Affiliation",
  subject: leaver,
  causer: leaver,
  ...history,
});

describe("<UserHistoryCard />", () => {
  it("shows a Custodian confirming a leaver's data access was revoked", () => {
    render(
      <UserHistoryCard
        history={mockHistory({
          log_name: "custodian_has_project_has_user",
          event: UserHistoryLog.ACCESS_REVOKED,
          subject_type: "App\\Models\\CustodianHasProjectUser",
          causer: custodianUser,
          properties: {
            old: {},
            attributes: {},
            project_title: "Example Project" as unknown as Record<
              string,
              string
            >,
          },
        })}
      />
    );

    expect(
      screen.getByText(
        "John Smith - Confirmed data access revoked for Jane Doe"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/On project "Example Project"/)
    ).toBeInTheDocument();
  });

  it("shows an affiliation end date being recorded", () => {
    render(
      <UserHistoryCard
        history={mockHistory({
          event: UserHistoryLog.AFFILIATION_END_DATE_RECORDED,
          properties: { old: {}, attributes: { to: "2026-11-04" } },
        })}
      />
    );

    expect(
      screen.getByText("Jane Doe - Recorded an affiliation end date")
    ).toBeInTheDocument();
    expect(screen.getByText(/End date: /)).toBeInTheDocument();
  });

  it("shows an affiliation end date being removed", () => {
    render(
      <UserHistoryCard
        history={mockHistory({
          event: UserHistoryLog.AFFILIATION_END_DATE_RECORDED,
          properties: {
            old: {},
            attributes: { to: null as unknown as string },
          },
        })}
      />
    );

    expect(screen.getByText(/The end date was removed/)).toBeInTheDocument();
  });

  it("shows an affiliation ending", () => {
    render(
      <UserHistoryCard
        history={mockHistory({ event: UserHistoryLog.AFFILIATION_ENDED })}
      />
    );

    expect(
      screen.getByText("Jane Doe - Affiliation ended")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The affiliation ended, so Jane Doe left any projects they were on through it/
      )
    ).toBeInTheDocument();
  });

  it("shows an affiliation update", () => {
    render(<UserHistoryCard history={mockHistory({})} />);

    expect(
      screen.getByText("Jane Doe - Updated an affiliation")
    ).toBeInTheDocument();
  });
});
