export interface WebhookFields {
  receiver_url: string;
}

const addWebhookRow = (webhook: WebhookFields) => {
  cy.buttonClick("Add");

  cy.get('input[name^="webhooks"]')
    .filter('[name$="receiver_url"]')
    .last()
    .clear()
    .type(webhook.receiver_url);
};

const fillFirstWebhookRow = (webhook: WebhookFields) => {
  cy.get('input[name^="webhooks"]')
    .filter('[name$="receiver_url"]')
    .first()
    .clear()
    .type(webhook.receiver_url);
};

const saveWebhooks = () => {
  cy.contains("button", "Save").should("be.enabled").click();
  cy.clickAlertModal("OK");
};

const hasWebhook = (webhook: WebhookFields) => {
  cy.get('input[name^="webhooks"]')
    .filter('[name$="receiver_url"]')
    .filter(`[value="${webhook.receiver_url}"]`)
    .should("exist");
};

const removeWebhookRow = (webhook: WebhookFields) => {
  cy.get('input[name^="webhooks"]')
    .filter('[name$="receiver_url"]')
    .filter(`[value="${webhook.receiver_url}"]`)
    .parents(".MuiGrid-container")
    .first()
    .find('button[type="button"]')
    .click();
};

export {
  addWebhookRow,
  fillFirstWebhookRow,
  hasWebhook,
  removeWebhookRow,
  saveWebhooks,
};
