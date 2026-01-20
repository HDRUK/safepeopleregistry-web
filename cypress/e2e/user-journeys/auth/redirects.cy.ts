import { ROUTES } from "@/consts/router";
import { checkExpiredRedirect } from "cypress/support/utils/auth";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";
import { loginUser } from "cypress/support/utils/user/auth";

describe("Redirects", () => {
  afterEach(() => {
    logout();
  });

  it("Redirects custodian correctly when cookie is not present", () => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodian.path);
    cy.waitForLoadingToFinish();

    checkExpiredRedirect();
  });

  it("Redirects organisation correctly when cookie is not present", () => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisation.path);
    cy.waitForLoadingToFinish();

    checkExpiredRedirect();
  });

  it("Redirects user correctly when cookie is not present", () => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcher.path);
    cy.waitForLoadingToFinish();

    checkExpiredRedirect();
  });
});
