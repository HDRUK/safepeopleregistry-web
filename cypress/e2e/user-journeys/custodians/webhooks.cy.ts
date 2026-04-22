import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addWebhookRow,
  fillFirstWebhookRow,
  hasWebhook,
  removeWebhookRow,
  saveWebhooks,
} from "cypress/support/utils/custodian/webhooks";

const webhookUrl = `https://hooks.${faker.internet.domainName()}/webhook`;

describe("Custodian webhooks journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianConfigurationWebhooks.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Shows the webhooks configuration page", () => {
    cy.contains("Webhooks").should("exist");
    cy.get('input[name^="webhooks"]').should("exist");
  });

  it("Adds a webhook", () => {
    cy.get('input[name^="webhooks"]')
      .filter('[name$="receiver_url"]')
      .then($inputs => {
        if ($inputs.first().val() === "") {
          fillFirstWebhookRow({ receiver_url: webhookUrl });
        } else {
          addWebhookRow({ receiver_url: webhookUrl });
        }
      });

    saveWebhooks();

    cy.visitFirst(ROUTES.profileCustodianConfigurationWebhooks.path);

    cy.waitForLoadingToFinish();

    hasWebhook({ receiver_url: webhookUrl });
  });

  it("Removes a webhook", () => {
    hasWebhook({ receiver_url: webhookUrl });

    removeWebhookRow({ receiver_url: webhookUrl });

    saveWebhooks();

    cy.visitFirst(ROUTES.profileCustodianConfigurationWebhooks.path);

    cy.waitForLoadingToFinish();

    cy.get('input[name^="webhooks"]')
      .filter('[name$="receiver_url"]')
      .filter(`[value="${webhookUrl}"]`)
      .should("not.exist");
  });
});
