import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectUsers,
  hasProjectUsers,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT_USERS_CUSTODIANS } from "cypress/support/utils/data";

const dataProjectUser = DEFAULT_PROJECT_USERS_CUSTODIANS;

describe("Projects users journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianUsers.path);

    cy.buttonClick("Switch to list view");
  });

  after(() => {
    // logout();
  });

  it("Changes status of a user", () => {
    changeStatusProjectUsers(
      dataProjectUser,
      Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER
    );

    cy.wait(5000);

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
