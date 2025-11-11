import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { getName } from "@/utils/application";
import { goToSafePeople } from "cypress/support/utils/application/router";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
  addNewUsersToProject,
  changePrimaryContactProjectUsers,
  changeStatusProjectUsers,
  hasPrimaryContact,
  hasProjectUsers,
  removeFromProjectUsers,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_INVITE_USERS,
} from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;
const dataProject = DEFAULT_PROJECT;

describe("Projects safe people journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    addNewProject(dataProject);

    goToSafePeople();

    cy.contains("button", "Add a new member").click();

    cy.contains(
      "a",
      /invite them to create a Safe People Registry account here/i
    ).click();

    addNewUsersToProject(dataProjectInviteUser);
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

    addNewUsersToProject(dataProjectInviteUser);

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
