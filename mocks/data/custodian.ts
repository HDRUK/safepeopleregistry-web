import {
  Custodian,
  CustodianProjectOrganisation,
  CustodianProjectUser,
  CustodianUser,
  ProjectAllUser,
  ProjectOrganisation,
  ProjectUser,
} from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedOrganisation } from "./organisation";
import { mockedProject } from "./project";
import { mockedAffiliation, mockedUser } from "./user";
import { Status } from "@/consts/application";

const mockedCustodian = (custodian?: Partial<Custodian>): Custodian => ({
  id: 1,
  contact_email: faker.internet.email(),
  idvt_required: false,
  permissions: [],
  invite_accepted_at: null,
  invite_sent_at: null,
  unique_identifier: faker.string.uuid(),
  enabled: true,
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  name: faker.company.name(),
  ...custodian,
});

const mockedCustodianUser = (
  custodianUser?: Partial<CustodianUser>
): CustodianUser => ({
  id: 1,
  custodian_id: 1,
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...custodianUser,
  user_permissions: custodianUser?.user_permissions || [],
});

const mockedProjectUser = (props: Partial<ProjectAllUser>): ProjectAllUser => ({
  id: 1,
  first_name: "Dan",
  last_name: "Ackroyd",
  user_id: 10,
  digi_ident: "$2y$12$ldUAvE7ZsHkodDzZKJH4je9tNs/G9B7M0k.4ywN0em0v/KO5GQDTu",
  registry_id: 1,
  project_id: 1,
  project_name:
    "Exploring the Impact of Digital Health Interventions on Mental Health Outcomes in Young Adults",
  project_role: "Principal Investigator (PI)",
  organisation_id: 1,
  organisation_name: "Health Pathways (UK) Limited",
  model_state: {
    state: {
      slug: "registered",
    },
  },
  ...props,
});

const mockedProjectHasUser = (props: Partial<ProjectUser>): ProjectUser => ({
  id: 1,
  project_id: 1,
  project: mockedProject(),
  project_role_id: 1,
  primary_contact: false,
  user_digital_ident:
    "$2y$12$ldUAvE7ZsHkodDzZKJH4je9tNs/G9B7M0k.4ywN0em0v/KO5GQDTu",
  affiliation: mockedAffiliation(),
  registry: {
    id: 1,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    user: mockedUser(),
  },
  role: {
    name: "Principal Investigator (PI)",
  },
  ...props,
});

const mockedProjectHasOrganisation = (
  props: Partial<ProjectOrganisation>
): ProjectOrganisation => ({
  id: 1,
  project_id: 1,
  project: mockedProject(),
  organisation: mockedOrganisation(),
  ...props,
});

const mockedCustodianHasProjectUser = (
  props: Partial<CustodianProjectUser>
): CustodianProjectUser => ({
  id: 1,
  project_has_user_id: 1,
  custodian_id: 1,
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  project_has_user: mockedProjectHasUser({ id: 1 }),
  model_state: {
    state: {
      slug: Status.PENDING,
    },
  },
  ...props,
});

const mockedCustodianHasProjectOrganisation = (
  props?: Partial<CustodianProjectOrganisation>
): CustodianProjectOrganisation => ({
  id: 1,
  project_has_organisation_id: 1,
  custodian_id: 1,
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  project_organisation: mockedProjectHasOrganisation({ id: 1 }),
  model_state: {
    state: {
      slug: Status.PENDING,
    },
  },
  ...props,
});

export {
  mockedCustodian,
  mockedCustodianHasProjectOrganisation,
  mockedCustodianHasProjectUser,
  mockedCustodianUser,
  mockedProjectHasOrganisation,
  mockedProjectHasUser,
  mockedProjectUser,
};
