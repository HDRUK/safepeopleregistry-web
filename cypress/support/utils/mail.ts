import { o } from "framer-motion/dist/types.d-B_QPEvFK";

function actionMessage(
  label: string | RegExp,
  options: {
    to: string;
  }
) {
  cy.log(`****** DOING WAIT`);
  cy.wait(6000);

  cy.log(`****** WAITED`);
  cy.maildevGetMessageBySentTo(options.to).then(email => {
    cy.log(`****** STARTED: ${options.to}`, email?.html);
    const emailHtml = Cypress.$(email?.html);
    cy.log(`****** EMAIL: ${emailHtml.get(0).outerHTML}`);
    const link = emailHtml.find("a").filter((_, el) => {
      if (typeof label === "string") {
        return el.textContent === label;
      }

      return label.test(el.textContent);
    });

    cy.log(`****** EMAIL: ${emailHtml}`);

    const href = link.attr("href");

    cy.log(`****** FOUND HREF: ${href}`);

    if (!href) {
      throw new Error("Email doesn't exist");
    } else {
      cy.visit(href);
    }
  });
}

export { actionMessage };
