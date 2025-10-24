import { Status } from "@/consts/application";
import {
  mockedCustodianHasProjectOrganisation,
  mockedCustodianHasProjectUser,
  mockedProjectHasOrganisation,
  mockedProjectHasUser,
} from "@/mocks/data/custodian";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";

const memberId = Cypress._.random(0, 1e6).toString();

const DEFAULT_FROM_DATE = "2025-01-01";
const DEFAULT_TO_DATE = "2025-02-01";
const DEFAULT_DEPARTMENT = "Clinical Research";

const DEFAULT_AFFILIATION_USERS = mockedAffiliation({
  relationship: "Employee",
  organisation: {
    organisation_name: "Health Data Research UK",
  },
  role: "Manager",
  member_id: memberId,
  from: DEFAULT_FROM_DATE,
  to: null,
  current_employer: true,
});

const DEFAULT_INVITE_USERS = mockedUser({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
});

const DEFAULT_PROJECT_NAME =
  "Assessing Air Quality Impact on Respiratory Health in Urban Populations";

const DEFAULT_ORGANISATION_NAME = "Health Pathways (UK) Limited";
const DEFAULT_UNAPPROVED_ORGANISATION_NAME = "TANDY ENERGY LIMITED";

const DEFAULT_ROLE_NAME = "Researcher";

const DEFAULT_PDF_FILE = {
  contents: "cypress/fixtures/sample.pdf",
  fileName: "sample.pdf",
  mimeType: "application/pdf",
};

const DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS =
  mockedCustodianHasProjectOrganisation({
    project_organisation: mockedProjectHasOrganisation({
      project: {
        title: DEFAULT_PROJECT_NAME,
      },
    }),
  });

const DEFAULT_PROJECT_USERS_CUSTODIANS = mockedCustodianHasProjectUser({
  project_has_user: mockedProjectHasUser({
    project: {
      title: DEFAULT_PROJECT_NAME,
    },
    registry: {
      user: {
        first_name: "Annie",
        last_name: "Potts",
      },
    },
  }),
});

const DEFAULT_PROJECT_INVITE_USERS = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  role: DEFAULT_ROLE_NAME,
  organisation_id: DEFAULT_ORGANISATION_NAME,
};

const DEFAULT_SRO_FIELDS_ORGANISATIONS = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  job_title: DEFAULT_ROLE_NAME,
  department: DEFAULT_DEPARTMENT,
  sro_profile_uri: faker.internet.url(),
};

const DEFAULT_ORGANISATION = mockedOrganisation({
  organisation_name: DEFAULT_ORGANISATION_NAME,
});

const DEFAULT_UNAPPROVED_ORGANISATION = mockedOrganisation({
  organisation_name: DEFAULT_UNAPPROVED_ORGANISATION_NAME,
});

export {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_FROM_DATE,
  DEFAULT_TO_DATE,
  DEFAULT_INVITE_USERS,
  DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS,
  DEFAULT_PROJECT_USERS_CUSTODIANS,
  DEFAULT_PROJECT_NAME,
  DEFAULT_ORGANISATION_NAME,
  DEFAULT_ROLE_NAME,
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_ORGANISATION,
  DEFAULT_DEPARTMENT,
  DEFAULT_SRO_FIELDS_ORGANISATIONS,
  DEFAULT_PDF_FILE,
  DEFAULT_UNAPPROVED_ORGANISATION,
};
