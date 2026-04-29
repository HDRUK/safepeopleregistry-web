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

describe("Custodian webhooks journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianConfigurationWebhooks.path);

    cy.waitForLoadingToFinish();
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
  });

  it.only("Adds a webhook", () => {
    const webhookUrl = `https://hooks.${faker.internet.domainName()}/webhook`;
    cy.waitForLoadingToFinish();
    cy.contains("button", "Add").then(($btn) => {
      if ($btn.length) {
        cy.wrap($btn).click();
      }
    });

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

    removeWebhookRow({ receiver_url: webhookUrl });
    saveWebhooks();
  });

  it("Removes a webhook", () => {
    const webhookUrl = `https://hooks.${faker.internet.domainName()}/webhook`;

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
