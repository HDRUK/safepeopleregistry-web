import { EntityType } from "@/types/api";
import { render } from "@/utils/testUtils";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import ProjectOrganisations from "./ProjectOrganisations";

jest.mock("@/organisms/ProjectOrganisationsBoard", () => () => (
  <div>ProjectOrganisationsBoard</div>
));

const defaultProps = {
  custodianId: 1,
  routes: { name: { path: "/profile" } },
  variant: EntityType.CUSTODIAN,
  paginatedQueryParams: {
    perPage: 25,
  },
};

const setupTest = (props: { readOnly?: boolean } = {}) => {
  render(<ProjectOrganisations {...defaultProps} {...props} />);
};

describe("ProjectOrganisations", () => {
  it("renders the Kanban board by default", async () => {
    setupTest();

    await waitFor(() => {
      expect(screen.getByText("ProjectOrganisationsBoard")).toBeInTheDocument();
    });
  });

  it("has the correct headers", async () => {
    setupTest();

    const toggleButton = screen.getByText("Switch to list view");
    fireEvent.click(toggleButton);

    const rows = await screen.findAllByRole("row");
    const thRow = within(rows[0]);

    await waitFor(() => {
      expect(thRow.getByText("Organisation name")).toBeInTheDocument();
    });

    expect(thRow.getByText("Project name")).toBeInTheDocument();
    expect(thRow.getByText("Senior Responsible Officer")).toBeInTheDocument();
    expect(thRow.getByText("Validation status")).toBeInTheDocument();
  });

  it("has the correct number of rows", async () => {
    setupTest();

    const toggleButton = screen.getByText("Switch to list view");
    fireEvent.click(toggleButton);

    const rows = await screen.findAllByRole("row");

    expect(rows).toHaveLength(2);
  });

  describe("when read-only", () => {
    it("shows the list view only, with no kanban toggle", async () => {
      setupTest({ readOnly: true });

      expect(await screen.findAllByRole("row")).toHaveLength(2);
      expect(
        screen.queryByText("ProjectOrganisationsBoard")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Switch to list view")).not.toBeInTheDocument();
    });
  });
});
