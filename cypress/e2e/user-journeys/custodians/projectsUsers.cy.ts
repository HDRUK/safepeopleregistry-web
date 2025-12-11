import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectUsers,
  goToProjectUsersList,
  hasProjectUsers,
  inviteNewProjectUser,
  removeFromProjectUsers,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_PROJECT_USERS_CUSTODIANS,
} from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

const { first_name, last_name } = dataProjectInviteUser;

const dataProjectUser = mockedCustodianHasProjectUser({
  ...DEFAULT_PROJECT_USERS_CUSTODIANS,
  project_has_user: {
    ...DEFAULT_PROJECT_USERS_CUSTODIANS.project_has_user,
    registry: {
      user: {
        first_name,
        last_name,
      },
    },
  },
});

describe("Projects users journey", () => {
  after(() => {
    logout();
  });

  before(() => {
    loginCustodian();

    goToProjectUsersList();

    inviteNewProjectUser(dataProjectInviteUser);
  });

  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianUsers.path);

    cy.buttonClick("Switch to list view");
  });
  it('should have no detectable accessibility violations on load', () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });
  it("Changes status of a user", () => {
    changeStatusProjectUsers({ first_name, last_name }, Status.PENDING);

    hasProjectUsers({
      ...dataProjectUser,
      model_state: {
        state: {
          slug: Status.PENDING,
        },
      },
    });
  });

  it("Removes a user from the project", () => {
    removeFromProjectUsers({ first_name, last_name });

    cy.getResultsRow().should("not.exist");
  });
});