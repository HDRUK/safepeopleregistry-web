import { ROUTES } from "@/consts/router";
import { mockedCustodian } from "./custodian";
import { mockedOrganisation } from "./organisation";
import { mockedProject } from "./project";
import {
  mockedAccreditation,
  mockedAffiliation,
  mockedEducation,
  mockedEmployment,
  mockedTraining,
  mockedUser,
  mockedProfessionalRegistration,
} from "./user";

const mockedApiPermissions = [
  {
    id: 1,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_GATEWAY",
    enabled: true,
    description: null,
  },
  {
    id: 2,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_COHORT",
    enabled: true,
    description: null,
  },
  {
    id: 3,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_ATLAS",
    enabled: true,
    description: null,
  },
  {
    id: 4,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_METADATA_HIGH",
    enabled: true,
    description: null,
  },
  {
    id: 5,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_METADATA_DETAILED",
    enabled: true,
    description: null,
  },
  {
    id: 6,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_CCS",
    enabled: true,
    description: null,
  },
  {
    id: 7,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_IRM",
    enabled: true,
    description: null,
  },
  {
    id: 8,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_RE",
    enabled: true,
    description: null,
  },
  {
    id: 9,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "COHORT_SDE_QUERY",
    enabled: true,
    description: null,
  },
  {
    id: 10,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_ADMIN",
    enabled: true,
    description: "administrator",
  },
  {
    id: 11,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_APPROVER",
    enabled: true,
    description: "approver",
  },
  {
    id: 12,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_KEYCARD_CREATE",
    enabled: true,
    description: null,
  },
  {
    id: 13,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_KEYCARD_REVOKE",
    enabled: true,
    description: null,
  },
  {
    id: 14,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_READ_ONLY",
    enabled: true,
    description: "read only",
  },
];

const mockedApiSectors = [
  {
    id: 1,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "NHS",
  },
  {
    id: 2,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "NGO",
  },
  {
    id: 3,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Public",
  },
  {
    id: 4,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Healthcare Providers",
  },
  {
    id: 5,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Pharmaceutical and Biotechnology Companies (non-SME)",
  },
  {
    id: 6,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Pharmaceutical and Biotechnology Companies (SME)",
  },
  {
    id: 7,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Academic Research Institutions",
  },
  {
    id: 8,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Government Agencies: e.g., DHSC, Regulatory bodies, NICE",
  },
  {
    id: 9,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Non-Profit Organisations (e.g., foundations, advocacy groups, charities)",
  },
  {
    id: 10,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Other for-profit organisations (non-SME)",
  },
  {
    id: 11,
    deleted_at: null,
    created_at: "2025-02-05T11:03:19.000000Z",
    updated_at: "2025-02-05T11:03:19.000000Z",
    name: "Other for-profit organisations (SME)",
  },
];

const mockedStoreState = () => ({
  application: {
    routes: ROUTES,
    system: {
      PER_PAGE: {
        value: 25,
      },
    },
  },
  config: {
    histories: {
      employments: [mockedEmployment()],
      training: [mockedTraining()],
      education: [mockedEducation()],
      approvedProjects: [mockedProject()],
      affiliations: [
        mockedAffiliation({
          current_employer: false,
          id: 1,
          member_id: "A1234567",
          organisation: {
            organisation_name: "Organisation 1",
          },
        }),
      ],
      accreditations: [mockedAccreditation()],
      professionalRegistrations: [mockedProfessionalRegistration()],
    },
    user: mockedUser({
      id: 1,
      registry_id: 1,
    }),
    organisation: mockedOrganisation({
      id: 1,
    }),
    custodian: mockedCustodian({
      id: 1,
    }),
    permissions: mockedApiPermissions,
    sectors: mockedApiSectors,
    router: {
      history: [],
      entries: ROUTES,
    },
  },
});

export { mockedApiPermissions, mockedStoreState };
