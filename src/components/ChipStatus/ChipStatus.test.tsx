import { Status } from "@/consts/application";
import { StatusCategory } from "@/consts/status";
import { render, screen, userEvent } from "../../utils/testUtils";
import ChipStatus from ".";

describe("<ChipStatus />", () => {
  it("shows the user validation definition", async () => {
    render(
      <ChipStatus
        status={Status.PENDING}
        statusCategory={StatusCategory.USER_VALIDATION}
      />
    );

    await userEvent.hover(screen.getByText("Pending"));

    expect(
      await screen.findByText(
        "User has verified their professional email address and is awaiting Custodian validation."
      )
    ).toBeInTheDocument();
  });

  it("shows the organisation validation definition for the same status", async () => {
    render(
      <ChipStatus
        status={Status.PENDING}
        statusCategory={StatusCategory.ORGANISATION_VALIDATION}
      />
    );

    await userEvent.hover(screen.getByText("Pending"));

    expect(
      await screen.findByText(
        "Organisation has registered and is awaiting Custodian validation."
      )
    ).toBeInTheDocument();
  });

  it("shows the project definition", async () => {
    render(
      <ChipStatus
        status={Status.PROJECT_COMPLETED}
        statusCategory={StatusCategory.PROJECT}
      />
    );

    await userEvent.hover(screen.getByText("Completed"));

    expect(await screen.findByText("Project has ended.")).toBeInTheDocument();
  });

  it("shows the full label when there is no definition", async () => {
    render(<ChipStatus status={Status.PENDING} />);

    await userEvent.hover(screen.getByText("Pending"));

    expect(await screen.findByText("Pending Validation")).toBeInTheDocument();
  });
});
