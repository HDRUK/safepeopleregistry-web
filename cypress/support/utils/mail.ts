function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  cy.wait(6000);

  cy.maildevGetMessageBySentTo(options.to)
    .debug()
    .then(email => {
      cy.task("log", label);
      cy.task("log", options.to);
      cy.task("log", JSON.stringify(email));

      cy.maildevVisitMessageById(email.id);

      cy.contains("a", label)
        .invoke("attr", "href")
        .then(href => {
          cy.visit(href);
        });
    });
}

export { actionMessage };
