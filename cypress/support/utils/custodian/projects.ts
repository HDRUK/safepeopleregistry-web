import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import {
  CustodianProjectOrganisation,
  CustodianProjectUser,
  ProjectDetails,
  ResearcherProject,
  User,
} from "@/types/application";
import {
  InviteOrganisationFormValues,
  InviteUserFormValues,
} from "@/types/form";
import { getName, getShortStatus, getStatus } from "@/utils/application";
import { formatDisplayLongDate } from "@/utils/date";
import { dataCy } from "../common";
import { DEFAULT_PROJECT_NAME, DEFAULT_ROLE_NAME } from "../data";
import { inviteOrganisation } from "../admin/invite";

const goToProjectUsersList = (projectTitle: string = DEFAULT_PROJECT_NAME) => {
  cy.visitFirst(ROUTES.profileCustodianProjects.path);

  cy.contains("a", projectTitle).click();
  cy.contains("a", "Safe People").click();
  cy.contains("button", "Switch to list view").click();
};

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

const changeStatusProjectUsers = (user: User, status: Status) => {
  const row = cy.getResultsActionMenu(getName(user));

  row.click();

  changeStatusProjectEntities(status);
};

const removeFromProjectUsers = (user: User) => {
  const row = cy.getResultsActionMenu(getName(user));

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
  cy.getLatestRowOfResults();
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
  cy.getLatestRowOfResults();
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
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(
    getName(project.project_has_user.registry.user)
  );

  row.within(() => {
    cy.contains("td", DEFAULT_ROLE_NAME);
    cy.contains("td", projectTitle);
    cy.contains("td", getShortStatus(project.model_state.state.slug));
  });

  cy.getResultsActionMenu(projectTitle).should("exist");
};

const inviteNewProjectUser = (invite: InviteUserFormValues) => {
  cy.contains("button", "Add a new member").click();

  cy.contains(
    "a",
    /invite them to create a Safe People Registry account here/i
  ).click();

  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("role", invite.role);
  cy.selectValue("organisation_id", invite.organisation_id);

  cy.saveFormClick("Invite");
  cy.swalClick("Close");

  cy.wait(2000);

  cy.saveContinueClick("Save");
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

const invitesNewSponsor = (invite: InviteOrganisationFormValues) => {
  cy.contains("button", "Add new project").click();
  cy.contains("button", "Invite to register").click();

  inviteOrganisation(invite);
};

const addNewProject = (project: ResearcherProject) => {
  cy.contains("button", "Add new project").click();

  cy.get("#unique_id").clear().type(project.unique_id);
  cy.get("#title").clear().type(project.title);

  cy.selectValue("sponsor_id", "Test Organisation, LTD");

  cy.get("#request_category_type").clear().type(project.request_category_type);
  cy.dateSelectValue("start_date", project.start_date);
  cy.dateSelectValue("end_date", project.end_date);
  cy.get("#lay_summary").clear().type(project.lay_summary);
  cy.get("#public_benefit").clear().type(project.public_benefit);
  cy.get("#technical_summary").clear().type(project.technical_summary);

  cy.saveContinueClick("Save");
  cy.swalClick("Close");
};

const hasProjectSponsor = () => {
  cy.get(dataCy("invite-sponsor")).within(() => {
    cy.contains(getStatus(Status.INVITED)).should("exist");
    cy.contains("button", "Resend invite").should("exist");
  });
};

const hasProject = (project: ResearcherProject) => {
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(project.title);

  row.within(() => {
    cy.contains("td", project.title);
    cy.contains("td", formatDisplayLongDate(project.start_date));
    cy.contains("td", formatDisplayLongDate(project.end_date));
    cy.contains("td", getStatus(project.model_state.state.slug));
  });
};

const hasSponsoredProject = (project: ResearcherProject) => {
  cy.get(dataCy("projects-sponsorship")).within(() => {
    hasProject(project);
  });
};

const updateSafeDataProject = (projectDetails: ProjectDetails) => {
  cy.get("#datasets\\.0\\.value")
    .clear()
    .type(JSON.parse(projectDetails.datasets)[0]);
  cy.selectValue("data_sensitivity_level", "Anonymous");
  cy.checkboxCheck("duty_of_confidentiality");
  cy.checkboxCheck("national_data_optout");

  cy.get("#legal_basis_for_data_article6")
    .clear()
    .type(projectDetails.legal_basis_for_data_article6);
  cy.get("#dataset_linkage_description")
    .clear()
    .type(projectDetails.dataset_linkage_description);
  cy.get("#data_minimisation").clear().type(projectDetails.data_minimisation);
  cy.get("#data_use_description")
    .clear()
    .type(projectDetails.data_use_description);
  cy.dateSelectValue("access_date", projectDetails.access_date);

  cy.saveContinueClick("Save");
  cy.swalClick("Close");
};

const updateSafeSettingsProject = (projectDetails: ProjectDetails) => {
  cy.get("#data_privacy").clear().type(projectDetails.data_privacy);

  cy.saveContinueClick("Save");
  cy.swalClick("Close");
};

const updateSafeOutputsProject = (projectDetails: ProjectDetails) => {
  cy.get("#data_assets").clear().type(projectDetails.data_assets);

  cy.saveContinueClick("Save");
  cy.swalClick("Close");
};

export {
  addNewProject,
  addNewProjectUser,
  changePrimaryContactProjectUsers,
  changeStatusProjectOrganisations,
  changeStatusProjectUsers,
  goToProjectUsersList,
  hasNewProjectUsers,
  hasPrimaryContact,
  hasProject,
  hasProjectOrganisations,
  hasProjectUsers,
  inviteNewProjectUser,
  removeFromProjectUsers,
  updateSafeDataProject,
  updateSafeOutputsProject,
  updateSafeSettingsProject,
  invitesNewSponsor,
  hasProjectSponsor,
  hasSponsoredProject,
};
