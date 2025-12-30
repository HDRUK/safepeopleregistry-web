import { RequestFrequency } from "@/consts/projects";
import { ResearcherProject, type ProjectDetails } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedCustodianHasProjectUser } from "./custodian";
import { mockedOrganisation } from "./organisation";
import { Status } from "@/consts/application";

const mockedProject = (
  project?: Partial<ResearcherProject>
): ResearcherProject => ({
  id: faker.number.int(),
  title: faker.string.sample(),
  lay_summary: faker.string.sample(),
  public_benefit: faker.string.sample(),
  technical_summary: faker.string.sample(),
  start_date: faker.date.past().toDateString(),
  end_date: faker.date.future().toDateString(),
  request_category_type: faker.string.sample(),
  other_approval_committees: faker.string.sample(),
  organisations: [mockedOrganisation()],
  status: Status.PROJECT_PENDING,
  project_has_sponsorships: {},
  model_state: {
    state: {
      slug: Status.APPROVED,
    },
  },
  ...project,
});

const mockedProjects = (count: number): ResearcherProject[] => {
  return Array.from({ length: count }, () => mockedProject());
};

const mockedProjectDetails = (
  projectDetails?: Partial<ProjectDetails>
): ProjectDetails => ({
  id: 1,
  project_id: 4,
  datasets: '["dataset1"]',
  data_sensitivity_level: "Personally Identifiable",
  legal_basis_for_data_article6: "Legal Basis",
  duty_of_confidentiality: true,
  national_data_optout: false,
  request_frequency: RequestFrequency.ONE_OFF,
  dataset_linkage_description: "Linkage Description",
  data_minimisation: "Data Minimisation",
  data_use_description: "Data Use Description",
  access_date: "2023-01-01",
  data_privacy: "Data Privacy Information",
  data_assets: "Data Assets Information",
  ...projectDetails,
});

const mockedProjectStateWorkflow = () => ({
  form_received: ["validation_in_progress", "more_user_info_req"],
  validation_in_progress: [
    "validation_complete",
    "more_user_info_req",
    "escalate_validation",
    "validated",
  ],
  validation_complete: ["escalate_validation", "validated"],
  more_user_info_req: ["escalate_validation", "validated"],
  escalate_validation: ["validated"],
  validated: [],
});

const mockedKanbanCustodianProjectUsers = () => {
  const formReceived = [mockedCustodianHasProjectUser({ id: 1 })];

  const validationInProgressData = [
    mockedCustodianHasProjectUser({
      id: 2,
    }),
    mockedCustodianHasProjectUser({
      id: 3,
    }),
    mockedCustodianHasProjectUser({
      id: 4,
    }),
    mockedCustodianHasProjectUser({
      id: 5,
    }),
  ];

  const validationComplete = [
    mockedCustodianHasProjectUser({
      id: 6,
    }),
  ];

  const infoRequested = [
    mockedCustodianHasProjectUser({
      id: 7,
    }),
  ];

  const escalation = [
    mockedCustodianHasProjectUser({
      id: 8,
    }),
  ];

  const validated = [
    mockedCustodianHasProjectUser({
      id: 9,
    }),
  ];

  return {
    form_received: formReceived,
    validation_in_progress: validationInProgressData,
    validation_complete: validationComplete,
    more_user_info_req: infoRequested,
    escalation_validation: escalation,
    validated,
  };
};

export {
  mockedKanbanCustodianProjectUsers,
  mockedProject,
  mockedProjectDetails,
  mockedProjects,
  mockedProjectStateWorkflow,
};
