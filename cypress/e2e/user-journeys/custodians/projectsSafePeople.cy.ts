import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
import { getName } from "@/utils/application";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changePrimaryContactProjectUsers,
  changeStatusProjectUsers,
  hasPrimaryContact,
  hasProjectUsers,
  inviteNewProjectUser,
  removeFromProjectUsers,
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

    /** This currently isn't working due to observers not finishing */
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
    // Delay for observers to finish
    cy.wait(3000);

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

  it("Makes a user a primary contact", () => {
    changePrimaryContactProjectUsers(dataProjectUser);

    hasPrimaryContact(dataProjectUser);
  });

  it("Removes a user from the project", () => {
    removeFromProjectUsers(dataProjectUser);

    cy.getResultsRow()
      .find("td")
      .contains(getName(dataProjectUser.project_has_user.registry.user))
      .should("not.exist");
  });
});
