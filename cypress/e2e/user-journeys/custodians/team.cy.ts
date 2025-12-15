import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewTeamMemberCustodians,
  editTeamMemberCustodians,
  hasTeamMemberCustodians,
  removeTeamMemberCustodians,
} from "cypress/support/utils/custodian/team";
import { DEFAULT_CUSTODIAN_USER_FIELDS } from "cypress/support/utils/data";

const dataUser = DEFAULT_CUSTODIAN_USER_FIELDS;
let updatedEmail = dataUser.email;

describe("Custodians team user journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianContacts.path);
  });

  after(() => {
    logout();
  });
  it('should have no detectable accessibility violations on load', () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });
  it("Adds a new team member", () => {
    addNewTeamMemberCustodians(dataUser);

    hasTeamMemberCustodians(dataUser);
  });

  it("Edits safe data", () => {
    const edittedUser = {
      ...dataUser,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
    };

    updatedEmail = edittedUser.email;

    editTeamMemberCustodians(edittedUser, dataUser.email);

    hasTeamMemberCustodians(edittedUser);
  });

  it("Removes a team member", () => {
    removeTeamMemberCustodians(updatedEmail);

    cy.getResultsCellByValue(updatedEmail).should("not.exist");
  });
});
