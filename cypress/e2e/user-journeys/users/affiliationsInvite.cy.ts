import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedAffiliation } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import {
  logout,
  shouldBeOrganisationProfile,
  signout,
} from "cypress/support/utils/common";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_TO_DATE,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";
import { inviteAffiliationOrganisation } from "cypress/support/utils/user/affiliations";
import { loginUser } from "cypress/support/utils/user/auth";

const dataCurrentAffiliation = mockedAffiliation(DEFAULT_AFFILIATION_USERS);

describe("Affiliations journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  after(() => {
    logout();
  });

  it("Invites an organisation", () => {
    const inviteAfilliation = {
      ...dataCurrentAffiliation,
      organisation: {
        organisation_name: faker.company.name(),
        lead_applicant_email: faker.internet.email().toLowerCase(),
      },
    };

    inviteAffiliationOrganisation(inviteAfilliation);

    cy.swalClick("Close", "Verification needed");

    signout();

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP, "m"), {
      to: inviteAfilliation.organisation.lead_applicant_email,
    });

    const registration = mockedRegistration({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: inviteAfilliation.organisation.lead_applicant_email,
    });

    registerAndLogin(registration);

    shouldBeOrganisationProfile();
  });
});
