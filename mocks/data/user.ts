import { UserGroup } from "@/consts/user";
import {
  ResearcherAccreditation,
  ResearcherAffiliation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherProfessionalRegistration,
  ResearcherTraining,
  User,
} from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedApproval } from "./approvals";
import { mockedFile } from "./file";
import { mockedPermission } from "./permission";
import { mockedDepartment } from "./departments";
import { Status } from "@/components/ChipStatus";

const mockedUser = (user?: Partial<User>): User => ({
  profile_completed_at: null,
  profile_steps_completed: "",
  id: 2,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  user_group: UserGroup.USERS,
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  organisations: [],
  orcid_scanning: false,
  orcid_scanning_completed_at: null,
  departments: [mockedDepartment({ id: 2 })],
  registry: {
    files: [mockedFile()],
    verified: true,
    affiliations: [mockedAffiliation()],
  },
  ...user,
});

const mockedAccreditation = (
  accreditation?: Partial<ResearcherAccreditation>
): ResearcherAccreditation => ({
  id: 1,
  awarded_at: faker.commerce.department(),
  awarding_body_name: faker.company.name(),
  awarding_body_ror: faker.internet.url(),
  expires_at: faker.date.future().toDateString(),
  title: faker.string.sample(),
  awarded_locale: faker.location.country(),
  ...accreditation,
});

const mockedProfessionalRegistration = (
  professionalRegistration?: Partial<ResearcherProfessionalRegistration>
): ResearcherProfessionalRegistration => ({
  id: 1,
  name: faker.company.name(),
  member_id: faker.string.uuid(),
  ...professionalRegistration,
});

const mockedTraining = (
  training?: Partial<ResearcherTraining>
): ResearcherTraining => ({
  awarded_at: faker.date.past().toDateString(),
  provider: faker.company.name(),
  awarding_body_ror: faker.internet.url(),
  expires_at: faker.date.future().toDateString(),
  training_name: faker.string.sample(),
  expires_in_years: false,
  ...training,
});

const mockedEmployment = (
  employment?: Partial<ResearcherEmployment>
): ResearcherEmployment => ({
  department: faker.commerce.department(),
  employer_name: faker.company.name(),
  ror: faker.internet.url(),
  from: faker.date.past().toDateString(),
  to: faker.date.future().toDateString(),
  role: faker.string.sample(),
  is_current: false,
  ...employment,
});

const mockedEducation = (
  education?: Partial<ResearcherEducation>
): ResearcherEducation => ({
  institute_name: faker.commerce.department(),
  institute_address: faker.location.streetAddress(),
  institute_indentifier: faker.string.sample(),
  from: faker.date.past().toDateString(),
  to: faker.date.future().toDateString(),
  title: faker.string.sample(),
  source: faker.string.sample(),
  ...education,
});

const mockedAffiliation = (
  affiliation?: Partial<ResearcherAffiliation>
): ResearcherAffiliation => ({
  id: 1,
  member_id: faker.string.uuid(),
  organisation_id: 1,
  relationship: "employee",
  current_employer: true,
  organisation: {
    organisation_name: faker.company.name(),
  },
  from: faker.date.past().toUTCString(),
  to: "",
  department: faker.commerce.department(),
  email: faker.internet.email(),
  registryAffiliationState: Status.AFFILIATED,
  ...affiliation,
});

export {
  mockedAccreditation,
  mockedUser,
  mockedTraining,
  mockedEmployment,
  mockedEducation,
  mockedAffiliation,
  mockedProfessionalRegistration,
};
