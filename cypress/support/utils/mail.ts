function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  cy.wait(6000);

  cy.maildevGetMessageBySentTo(options.to).then(email => {
    const emailHtml = Cypress.$(email?.html);

    const link = emailHtml.find("a").filter((_, el) => {
      if (typeof label === "string") {
        return el.textContent === label;
      }

      return label.test(el.textContent);
    });

    const href = link.attr("href");

    if (!href) {
      throw new Error("Email doesn't exist");
    } else {
      cy.visit(href);
    }
  });
}

export { actionMessage };
