import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectUsers,
  hasProjectUsers,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT_USERS_CUSTODIANS } from "cypress/support/utils/data";

const dataProjectUser = DEFAULT_PROJECT_USERS_CUSTODIANS;

describe("Projects organisations journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianUsers.path);

    cy.contains("button", "Switch to list view").click();
  });

  after(() => {
    // logout();
  });

  it("Adds a user to the project", () => {
    changeStatusProjectUsers(
      dataProjectUser,
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

  it("Changes status of an user", () => {
    changeStatusProjectUsers(
      dataProjectUser,
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
});
