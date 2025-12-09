function actionLatestMessage(label: string) {
  cy.maildevGetLastMessage().then(email => {
    const emailHtml = Cypress.$(email.html);

    const link = emailHtml.find("a").filter((_, el) => {
      return el.textContent === label;
    });

    const href = link.attr("href");

    if (!href) {
      throw new Error("Email doesn't exist");
    } else {
      cy.visit(href);
    }
  });
}

export { actionLatestMessage };
