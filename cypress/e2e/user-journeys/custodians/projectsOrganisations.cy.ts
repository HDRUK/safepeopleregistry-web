import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { dataCy } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectOrganisations,
  hasProjectOrganisations,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS } from "cypress/support/utils/data";

const dataProjectOrganisation = DEFAULT_PROJECT_ORGANISATIONS_CUSTODIANS;

describe("Projects organisations journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianOrganisations.path);

    cy.contains("button", "Switch to list view").click();
  });

  after(() => {
    // logout();
  });

  it("Changes status of an organisation", () => {
    changeStatusProjectOrganisations(
      dataProjectOrganisation,
      Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER
    );

    hasProjectOrganisations({
      ...dataProjectOrganisation,
      model_state: {
        state: {
          slug: Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER,
        },
      },
    });
  });
});
