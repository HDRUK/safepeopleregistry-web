const EMAIL_POLL_INTERVAL = 15_000;
const EMAIL_POLL_TIMEOUT = 900_000; // 15 minutes — BE email delivery can be slow

function pollForEmail(
  address: string,
  elapsed = 0
): Cypress.Chainable<{ id: string }> {
  return cy.maildevGetMessageBySentTo(address).then(email => {
    if (email) {
      return cy.wrap(email as { id: string });
    }
    if (elapsed >= EMAIL_POLL_TIMEOUT) {
      throw new Error(
        `Email to ${address} not received within ${EMAIL_POLL_TIMEOUT / 60_000} minutes`
      );
    }
    return cy
      .wait(EMAIL_POLL_INTERVAL)
      .then(() => pollForEmail(address, elapsed + EMAIL_POLL_INTERVAL));
  });
}

function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  pollForEmail(options.to).then(email => {
    cy.maildevVisitMessageById(email.id);

    cy.contains("a", label)
      .invoke("attr", "href")
      .then(href => {
        cy.visit(href);
      });
  });
}

export { actionMessage };
