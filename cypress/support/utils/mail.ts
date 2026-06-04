const EMAIL_POLL_INTERVAL = 3_000;
const EMAIL_POLL_TIMEOUT = 900_000;

function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  let foundEmail: { id: string } | null = null;
  let elapsed = 0;

  function poll(): Cypress.Chainable {
    return cy.maildevGetMessageBySentTo(options.to).then(email => {
      if (email) {
        foundEmail = email as { id: string };
        return;
      }
      if (elapsed >= EMAIL_POLL_TIMEOUT) {
        throw new Error(
          `Email to ${options.to} not received within ${EMAIL_POLL_TIMEOUT / 60_000} minutes`
        );
      }
      elapsed += EMAIL_POLL_INTERVAL;
      return cy.wait(EMAIL_POLL_INTERVAL).then(poll);
    });
  }

  cy.wrap(null)
    .then(poll)
    .then(() => {
      cy.maildevVisitMessageById(foundEmail!.id);

      cy.contains("a", label)
        .invoke("attr", "href")
        .then(href => {
          cy.visit(href as string);
        });
    });
}

export { actionMessage };
