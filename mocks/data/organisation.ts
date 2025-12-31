import { Organisation } from "@/services/organisations";
import { Charity, Rule, Sector, Subsidiary } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedApproval } from "./approvals";
import { mockedDepartment } from "./departments";
import { mockedPermission } from "./permission";
import { mockedUser } from "./user";
import { mockedAddress } from "./application";
import { InviteOrganisationFormValues } from "@/types/form";

const mockedCharity = (charity?: Partial<Charity>) => ({
  name: faker.company.name(),
  registration_id: faker.string.numeric(8),
  country: faker.location.country(),
  website: faker.internet.url(),
  ...charity,
});

const mockedSector = (sector?: Partial<Sector>) => ({
  id: faker.number.int(),
  deleted_at: null,
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
  name: faker.company.name(),
  ...sector,
});

const mockedOrganisationInvite = (
  invite?: Partial<InviteOrganisationFormValues>
) => ({
  organisation_name: faker.company.name(),
  lead_applicant_email: faker.internet.email().toLowerCase(),
  ...invite,
});

const mockedSubsidiary = (subsidiary?: Partial<Subsidiary>) => ({
  ...mockedAddress(),
  id: faker.number.int(),
  name: faker.string.sample(),
  pivot: {
    organisation_id: faker.number.int(),
    subsidiary_id: faker.number.int(),
  },
  website: faker.internet.url(),
  ...subsidiary,
});

const mockedRule = (rule?: Partial<Rule>) => ({
  rule: "DataSecurityCompliance",
  conditions: {
    path: "ce_certified",
    expects: 1,
  },
  actual: true,
  status: true,
  ...rule,
});

const mockedOrganisation = (
  organisation?: Partial<Organisation>
): Organisation => ({
  ...mockedAddress(),
  companies_house_no: "01624297",
  dpo_email: "",
  dpo_name: "",
  hr_email: "",
  hr_name: "",
  idvt_result: null,
  idvt_completed_at: "",
  idvt_result_perc: 0,
  idvt_errors: "",
  organisation_name: faker.company.name(),
  organisation_unique_id: faker.string.uuid(),
  id: faker.number.int(),
  lead_applicant_email: faker.internet.email(),
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  sector_id: 1,
  charity_registration_id: "12345678",
  smb_status: true,
  organisation_size: 2,
  ror_id: "04a496k07",
  website: faker.internet.url(),
  departments: [
    mockedDepartment({
      name: "Clinical Research",
      category: "Health-Focused Departments",
    }),
    mockedDepartment({
      name: "Biostatistics and Data Science",
      category: "Health-Focused Departments",
    }),
  ],
  charities: [mockedCharity()],
  registries: [
    {
      user: mockedUser({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@hdruk.ac.uk",
        id: 1,
        approvals: [
          {
            id: 1,
            created_at: "2024-01-01T01:00:00z",
            updated_at: "2024-01-01T01:00:00z",
            name: "",
            contact_email: "",
            enabled: true,
            invite_accepted_at: "2024-01-02T00:00:00z",
            invite_sent_at: "2024-01-01T00:00:00z",
            pivot: {
              custodian_id: 1,
              organisation_id: 1,
            },
          },
        ],
      }),
    },
    {
      user: mockedUser({
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@hdruk.ac.uk",
        id: 2,
        registry: {
          verified: false,
        },
      }),
    },
  ],
  sector: mockedSector(),
  subsidiaries: [
    mockedSubsidiary({
      id: 1,
    }),
  ],
  sro_profile_uri: faker.internet.url(),
  ...organisation,
});

export {
  mockedCharity,
  mockedOrganisation,
  mockedSubsidiary,
  mockedRule,
  mockedSector,
  mockedOrganisationInvite,
};
