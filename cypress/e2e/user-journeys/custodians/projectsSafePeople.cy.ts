import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectUsers,
  hasProjectUsers,
  inviteNewProjectUser,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_PROJECT_NAME,
  DEFAULT_PROJECT_USERS_CUSTODIANS,
} from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

const dataProjectUser = mockedCustodianHasProjectUser({
  ...DEFAULT_PROJECT_USERS_CUSTODIANS,
  project_has_user: {
    ...DEFAULT_PROJECT_USERS_CUSTODIANS.project_has_user,
    registry: {
      user: {
        first_name: dataProjectInviteUser.first_name,
        last_name: dataProjectInviteUser.last_name,
      },
    },
  },
});

describe("Projects safe people journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    cy.contains("a", DEFAULT_PROJECT_NAME).click();

    cy.contains("a", "Safe People").click();

    cy.contains("button", "Switch to list view").click();
  });

  after(() => {
    // logout();
  });

  it("Invites a user to the project", () => {
    cy.contains("button", "Add a new member").click();

    cy.contains(
      "a",
      /invite them to create a Safe People Registry account here/i
    ).click();

    inviteNewProjectUser(dataProjectInviteUser);

    /** This currently isn't working */
    // hasNewProjectUsers({
    //   ...dataProjectUser,
    //   model_state: {
    //     state: {
    //       slug: Status.PENDING,
    //     },
    //   },
    // });
  });

  it("Has added a user to the project", () => {
    // This has been created from a previous test so the observers have had time to complete
    hasProjectUsers({
      ...dataProjectUser,
      model_state: {
        state: {
          slug: Status.PENDING,
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
