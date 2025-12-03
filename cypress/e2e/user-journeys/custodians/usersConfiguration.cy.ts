import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { hasCheckedOnUsersConfiguration } from "cypress/support/utils/custodian/usersConfiguration";



describe("Projects custodians journey", () => {
    beforeEach(() => {
      loginCustodian();
  
      cy.visitFirst(ROUTES.profileCustodianConfiguration.path);
    });
  
    after(() => {
      logout();
    });

    it("Has Checked On Users Configuration", () => {
        hasCheckedOnUsersConfiguration();
      });


});