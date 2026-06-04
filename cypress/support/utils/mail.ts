function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  cy.maildevGetMessageBySentTo(options.to).then(email => {
    cy.maildevVisitMessageById(email.id);
    cy.contains("a", label)
      .invoke("attr", "href")
      .then(href => {
        cy.visit(href as string);
      });
  });
}

export { actionMessage };
