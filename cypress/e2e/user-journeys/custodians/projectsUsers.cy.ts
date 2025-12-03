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

describe("Projects users journey",{ tags: ['@nightly']}, () => {
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

  it("Changes status of a user", () => {
    changeStatusProjectUsers(
      { first_name, last_name },
      Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER
    );

    hasProjectUsers({
      ...dataProjectUser,
      model_state: {
        state: {
          slug: Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER,
        },
      },
    });
  });

  it("Removes a user from the project", () => {
    removeFromProjectUsers({ first_name, last_name });

    cy.getResultsRow().should("not.exist");
  });
});
