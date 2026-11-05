import getOrganisations from "@/app/actions/organisations/getOrganisations";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { EntityType } from "@/types/api";
import { render, screen } from "@/utils/testUtils";
import SelectOrganisation from "./SelectOrganisation";

jest.mock("@/app/actions/organisations/getOrganisations");

const approved = mockedOrganisation({
  id: 1,
  organisation_name: "Approved Organisation",
  system_approved: true,
  sro_officer: undefined,
});

const unapproved = mockedOrganisation({
  id: 2,
  organisation_name: "Unapproved Organisation",
  system_approved: false,
  sro_officer: undefined,
});

const renderSelectOrganisation = (organisationsIds?: number[]) =>
  render(
    <SelectOrganisation
      entityType={EntityType.USER}
      entityId={1}
      organisationsIds={organisationsIds}
      open
    />
  );

describe("<SelectOrganisation />", () => {
  beforeEach(() => {
    (getOrganisations as jest.Mock).mockResolvedValue({
      data: { data: [approved, unapproved], last_page: 1, total: 2 },
    });
  });

  it("hides an unapproved organisation from a researcher", async () => {
    renderSelectOrganisation();

    expect(
      await screen.findByRole("option", { name: approved.organisation_name })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: unapproved.organisation_name })
    ).not.toBeInTheDocument();
  });

  it("shows an unapproved organisation that is allowed by id, e.g. a current employer", async () => {
    renderSelectOrganisation([unapproved.id]);

    expect(
      await screen.findByRole("option", { name: unapproved.organisation_name })
    ).toBeInTheDocument();
  });
});
