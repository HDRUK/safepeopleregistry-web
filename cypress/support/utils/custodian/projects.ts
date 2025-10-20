import { Status } from "@/consts/application";
import {
  CustodianProjectOrganisation,
  CustodianProjectUser,
} from "@/types/application";
import { InviteUserFormValues } from "@/types/form";
import { getName, getShortStatus, getStatus } from "@/utils/application";
import { dataCy } from "../common";
import { DEFAULT_ROLE_NAME } from "../data";

const changeStatusProjectEntities = (status: Status) => {
  cy.actionMenuClick("Change status");

  cy.get(dataCy("kanban-change-status")).click();

  cy.get(".MuiPopover-root").find("li").contains(getShortStatus(status)).click({
    force: true,
  });
  cy.get(".MuiPopover-root")
    .contains("button", "Confirm")
    .click({ force: true });

  cy.swalClick("Close");
};

const changeStatusProjectOrganisations = (
  project: CustodianProjectOrganisation,
  status: Status
) => {
  const row = cy.getResultsActionMenu(
    project.project_organisation.project.title
  );

  row.click();

  changeStatusProjectEntities(status);
};

const changeStatusProjectUsers = (
  project: CustodianProjectUser,
  status: Status
) => {
  const row = cy.getResultsActionMenu(
    getName(project.project_has_user.registry.user)
  );

  row.click();

  changeStatusProjectEntities(status);
};

const removeFromProjectUsers = (project: CustodianProjectUser) => {
  const row = cy.getResultsActionMenu(
    getName(project.project_has_user.registry.user)
  );

  row.click();

  cy.actionMenuClick("Remove from project");

  cy.swalClick("Delete", "Warning");
  cy.swalClick("Close");
};

const changePrimaryContactProjectUsers = (project: CustodianProjectUser) => {
  const row = cy.getResultsActionMenu(
    getName(project.project_has_user.registry.user)
  );

  row.click();

  cy.actionMenuClick("Make primary contact");

  cy.swalClick("Close");
};

const hasPrimaryContact = (
  project: CustodianProjectUser,
  state: boolean = true
) => {
  const row = cy.getResultsRowByValue(
    getName(project.project_has_user.registry.user)
  );

  row.within(() => {
    cy.get(dataCy("icon-primary-contact")).should(
      state ? "exist" : "not.exist"
    );
  });
};

const hasProjectOrganisations = (project: CustodianProjectOrganisation) => {
  const projectTitle = project.project_organisation.project.title;

  const row = cy.getResultsRowByValue(
    project.project_organisation.project.title
  );

  row.within(() => {
    cy.contains("td", projectTitle);
  });

  row.within(() => {
    cy.contains("td", getShortStatus(project.model_state.state.slug));
  });

  cy.getResultsActionMenu(projectTitle).should("exist");
};

const hasNewProjectUsers = (project: CustodianProjectUser) => {
  const row = cy
    .get(dataCy("form-modal"))
    .find("tbody tr")
    .should("be.visible")
    .contains("td", getName(project.project_has_user.registry.user))
    .parent();

  row.within(() => {
    cy.contains("td", DEFAULT_ROLE_NAME);
  });

  row.within(() => {
    cy.contains("td", getStatus(Status.PENDING));
  });

  row.within(() => {
    cy.contains("td", getShortStatus(project.model_state.state.slug));
  });
};

const hasProjectUsers = (project: CustodianProjectUser) => {
  const projectTitle = project.project_has_user.project.title;

  const row = cy.getResultsRowByValue(
    getName(project.project_has_user.registry.user)
  );

  row.within(() => {
    cy.contains("td", DEFAULT_ROLE_NAME);
  });

  row.within(() => {
    cy.contains("td", projectTitle);
  });

  row.within(() => {
    cy.contains("td", getShortStatus(project.model_state.state.slug));
  });

  cy.getResultsActionMenu(projectTitle).should("exist");
};

const inviteNewProjectUser = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("role", invite.role);
  cy.selectValue("organisation_id", invite.organisation_id);

  cy.saveFormClick("Invite");
  cy.swalClick("Close");

  // Observers haven't complete when refresh is called
  // cy.saveFormClick();
  // cy.swalClick("Close");
};

const addNewProjectUser = () => {
  cy.contains("button", "Add a new member");

  cy.getResultsRowByValue("Bill Murray").within(() => {
    cy.selectValue("project-role", DEFAULT_ROLE_NAME);
  });
};

export {
  addNewProjectUser,
  changeStatusProjectOrganisations,
  changeStatusProjectUsers,
  hasNewProjectUsers,
  hasProjectOrganisations,
  hasProjectUsers,
  inviteNewProjectUser,
  changePrimaryContactProjectUsers,
  hasPrimaryContact,
  removeFromProjectUsers,
};
