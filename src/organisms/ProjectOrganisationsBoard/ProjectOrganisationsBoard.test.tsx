import { Status } from "@/consts/application";
import {
  mockedCustodianHasProjectOrganisation,
  mockedProjectHasOrganisation,
} from "@/mocks/data/custodian";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import ProjectOrganisationsBoard from "./ProjectOrganisationsBoard";

const routes = {
  name: { path: "/projects/:id/organisations/:organisationId" },
};

const projectOrganisation = (id: number, name: string, status: Status) =>
  mockedCustodianHasProjectOrganisation({
    id,
    project_organisation: mockedProjectHasOrganisation({
      id,
      organisation: {
        ...mockedOrganisation({ id, organisation_name: name }),
        affiliations_count: 0,
      },
    }),
    model_state: { state: { slug: status } },
  });

function setupTest() {
  return render(
    <ProjectOrganisationsBoard
      itemsByTransitions={{
        [Status.INVITED]: [
          projectOrganisation(1, "Invited Organisation", Status.INVITED),
        ],
        [Status.SYSTEM_APPROVAL]: [
          projectOrganisation(
            2,
            "Awaiting Approval Organisation",
            Status.SYSTEM_APPROVAL
          ),
        ],
        [Status.PENDING]: [],
      }}
      onMove={jest.fn()}
      onDragEnd={jest.fn()}
      updateQueryState={{ isError: false, isSuccess: false }}
      routes={routes}
    />
  );
}

describe("<ProjectOrganisationsBoard />", () => {
  it("shows organisations that have been invited to the project", () => {
    setupTest();

    expect(screen.getByText("Invited (1)")).toBeInTheDocument();
    expect(screen.getByText(/Invited Organisation/)).toBeInTheDocument();
  });

  it("does not show organisations awaiting system approval", () => {
    setupTest();

    expect(
      screen.queryByText(/Awaiting Approval Organisation/)
    ).not.toBeInTheDocument();
  });
});
