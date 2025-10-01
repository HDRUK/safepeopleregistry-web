import { mockedOrganisation } from "@/mocks/data/organisation";
import { Organisation } from "../types/application";
import { render, screen } from "./testUtils";
import {
  renderOrganisationsNameCell,
  renderUserOrganisationsNameCell,
} from "./cells";

const CellUserOrganisationsTest = ({
  orgs,
}: {
  orgs: Organisation | Organisation[];
}) => {
  return renderUserOrganisationsNameCell(orgs);
};

const CellOrganisationsTest = ({
  orgs,
}: {
  orgs: Organisation | Organisation[];
}) => {
  return renderOrganisationsNameCell(orgs);
};

describe("Cells utils", () => {
  describe("renderUserOrganisationsNameCell", () => {
    it("handles 1 org", async () => {
      const org = mockedOrganisation({
        organisation_name: "Organisation 1",
      });

      render(<CellUserOrganisationsTest orgs={org} />);

      expect(screen.getByText(org.organisation_name)).toBeInTheDocument();
    });

    it("handles multiple orgs", async () => {
      const orgs = [
        mockedOrganisation({
          organisation_name: "Organisation 1",
        }),
        mockedOrganisation({
          organisation_name: "Organisation 2",
        }),
      ];

      render(<CellUserOrganisationsTest orgs={orgs} />);

      expect(
        screen.getByText(
          `${orgs[0].organisation_name}, ${orgs[1].organisation_name}`
        )
      ).toBeInTheDocument();
    });

    it("handles no org", async () => {
      render(<CellUserOrganisationsTest orgs={[]} />);

      expect(screen.getByText("Not affiliated")).toBeInTheDocument();
    });
  });

  describe("renderOrganisationsNameCell", () => {
    it("handles 1 org", async () => {
      const org = mockedOrganisation({
        organisation_name: "Organisation 1",
      });

      render(<CellOrganisationsTest orgs={org} />);

      expect(screen.getByText(org.organisation_name)).toBeInTheDocument();
    });

    it("handles multiple orgs", async () => {
      const orgs = [
        mockedOrganisation({
          organisation_name: "Organisation 1",
        }),
        mockedOrganisation({
          organisation_name: "Organisation 2",
        }),
      ];

      render(<CellOrganisationsTest orgs={orgs} />);

      expect(
        screen.getByText(
          `${orgs[0].organisation_name}, ${orgs[1].organisation_name}`
        )
      ).toBeInTheDocument();
    });

    it("handles undefined orgs", async () => {
      const orgs = [
        null,
        mockedOrganisation({
          organisation_name: "Organisation 1",
        }),
      ];

      render(<CellOrganisationsTest orgs={orgs} />);

      expect(screen.getByText(orgs[1].organisation_name)).toBeInTheDocument();
    });
  });
});
