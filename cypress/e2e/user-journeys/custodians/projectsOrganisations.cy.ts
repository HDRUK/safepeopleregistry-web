import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectOrganisations,
  goToProjectUsersList,
  hasProjectOrganisations,
  inviteNewProjectUser,
  removeFromProjectUsers,
} from "cypress/support/utils/custodian/projects";

import {
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS,
} from "cypress/support/utils/data";

const dataProjectOrganisation = DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS;
const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

describe("Projects organisations journey",() => {
  before(() => {
    loginCustodian();

    goToProjectUsersList();

    inviteNewProjectUser(dataProjectInviteUser);
  });

  after(() => {
    loginCustodian();

    goToProjectUsersList();

    const { first_name, last_name } = dataProjectInviteUser;

    removeFromProjectUsers({ first_name, last_name });
  });

  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianOrganisations.path);

    cy.contains("button", "Switch to list view").click();
  });

  after(() => {
    logout();
  });
  it('should have no detectable accessibility violations on load', () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });

  it("Changes status of an organisation", () => {
    changeStatusProjectOrganisations(
      dataProjectOrganisation,
      Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER
    );

    hasProjectOrganisations({
      ...dataProjectOrganisation,
      model_state: {
        state: {
          slug: Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER,
        },
      },
    });
  });
});
