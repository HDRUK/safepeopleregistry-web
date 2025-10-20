import { Status } from "@/consts/application";
import {
  CustodianProjectOrganisation,
  CustodianProjectUser,
  User,
} from "@/types/application";
import { getShortStatus, getStatus } from "@/utils/application";
import { dataCy } from "../common";
import { DEFAULT_ORGANISATION_NAME, DEFAULT_ROLE_NAME } from "../data";
import { InviteUserFormValues } from "@/types/form";

const changeStatusProjectEntities = (status: Status) => {
  cy.actionMenuClick("Change status");

  cy.get(dataCy("kanban-change-status")).click();

  cy.get(".MuiPopover-root").find("li").contains(getStatus(status)).click({
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
  const row = cy.getResultsActionMenu(project.project_has_user.project.title);

  row.click();

  changeStatusProjectEntities(status);
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

const hasProjectUsers = (project: CustodianProjectUser) => {
  const projectTitle = project.project_has_user.project.title;

  const { first_name, last_name } = project.project_has_user.registry.user;
  const name = `${first_name} ${last_name}`;

  const row = cy.getResultsRowByValue(name);

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

  cy.saveFormClick();
  cy.swalClick("Close");
};

const addNewProjectUser = () => {
  cy.contains("button", "Add a new member");

  cy.getResultsRowByValue("Bill Murray").within(() => {
    cy.selectValue("project-role", DEFAULT_ROLE_NAME);
  });
};

export {
  changeStatusProjectOrganisations,
  hasProjectOrganisations,
  changeStatusProjectUsers,
  hasProjectUsers,
  addNewProjectUser,
  inviteNewProjectUser,
};
