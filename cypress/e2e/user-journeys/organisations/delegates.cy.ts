import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { DEFAULT_DELEGATE_FIELDS_ORGANISATIONS } from "cypress/support/utils/data";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";
import {
  editDelegateOrganisations,
  hasDelegateOrganisations,
  hasNoDelegateOrganisations,
  inviteNewDelegateOrganisations,
  removeDelegateOrganisations,
} from "cypress/support/utils/organisation/delegates";

const dataDelegate = DEFAULT_DELEGATE_FIELDS_ORGANISATIONS;

const edittedDelegate = {
  ...dataDelegate,
  delegate_first_name: faker.person.firstName(),
  delegate_last_name: faker.person.lastName(),
  department_name: "Ethics and Compliance",
};

describe("Organisations delegates journey", () => {
  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationTeamAdministration.path);
  });

  after(() => {
    // logout();
  });

  it("Adds a new delegate", () => {
    inviteNewDelegateOrganisations(dataDelegate);

    hasDelegateOrganisations(dataDelegate);
  });

  it("Edits a delegate", () => {
    editDelegateOrganisations(edittedDelegate, dataDelegate);

    hasDelegateOrganisations(edittedDelegate);
  });

  it("Removes a delegate", () => {
    removeDelegateOrganisations(edittedDelegate);

    hasNoDelegateOrganisations(edittedDelegate);
  });
});
