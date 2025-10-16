import dayjs from "dayjs";
import { dataCy } from "./utils/common";

Cypress.Commands.add("login", (email: string, password: string) => {
  const args = { email, password };

  cy.session(args, () => {
    cy.origin(
      Cypress.env("keycloakBaseUrl"),
      { args },
      ({ email, password }) => {
        const { getLoginPath } = Cypress.require("./utils/common");

        cy.visit(getLoginPath());

        cy.get("[id=username]").type(email);
        cy.get("[id=password]").type(password);

        cy.get("#kc-login").click();
      }
    );
  });
});

Cypress.Commands.add("dataCy", (value: string) => {
  return `[data-cy="${value}"]`;
});

Cypress.Commands.add("visitFirst", (path: string) => {
  cy.visit(path);

  cy.get("body").click();
});

Cypress.Commands.add("getResultsRow", (index?: number | string | undefined) => {
  const tableRows = cy.get("tbody tr", { timeout: 10000 }).should("be.visible");

  if (!index) return tableRows;

  if (typeof index === "string") {
    if (index === "last") {
      return tableRows.last();
    }

    return tableRows.first();
  }

  return tableRows.eq(index);
});

Cypress.Commands.add(
  "swalClick",
  (text: string = "OK", title: string = "Success") => {
    const swalContainer = cy.get(".swal2-container").should("be.visible");

    swalContainer.get(".swal2-title").contains(title);

    swalContainer.get("Button").contains(text).click();
  }
);

Cypress.Commands.add("actionMenuClick", (text: string) => {
  cy.get(".MuiPopover-root").should("be.visible").contains(text).click();
});

Cypress.Commands.add("buttonClick", (text: string) => {
  cy.get("button").contains(text).click();
});

Cypress.Commands.add("checkboxClick", (id: string) => {
  cy.get(`#${id}`).click();
});

Cypress.Commands.add("checkboxCheck", (id: string) => {
  cy.get(`#${id}`).check();
});

Cypress.Commands.add("checkboxUncheck", (id: string) => {
  cy.get(`#${id}`).uncheck();
});

Cypress.Commands.add("selectValue", (id: string, value: string) => {
  cy.get(`#${id}`).click();
  cy.get(`#menu-${id}`).get("li").contains(value).click();
});

Cypress.Commands.add("dateSelectValue", (id: string, value: string) => {
  const dateParts = value.split("-");

  cy.get(dataCy(`${id}-button`)).click();
  cy.get(dataCy(`${id}-popover`))
    .get(`.MuiPickersCalendarHeader-switchViewIcon`)
    .click()
    .get("button")
    .contains(dateParts[0])
    .click();

  cy.get(dataCy(`${id}-button`)).click();

  cy.get(`#${id}`).click();
  cy.get(`#${id}`).clear().type(`${dateParts[2]}/${dateParts[1]}`);
});

Cypress.Commands.add("saveFormClick", (text: string = "Save") => {
  const formModal = cy.get(dataCy("form-modal")).should("be.visible");

  formModal.get("button").contains(text).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login: (email: string, password: string) => void;
      dataCy: (value: string) => void;
      visitFirst: (path: string) => void;
      getResultsRow: (
        id?: number | "last" | "first" | undefined
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      swalClick: (text?: string, title?: string) => void;
      actionMenuClick: (text: string) => void;
      buttonClick: (text: string) => void;
      checkboxClick: (id: string) => void;
      checkboxCheck: (id: string) => void;
      checkboxUncheck: (id: string) => void;
      selectValue: (id: string, value: string) => void;
      dateSelectValue: (id: string, value: string) => void;
      saveFormClick: (text?: string) => void;
    }
  }
}
