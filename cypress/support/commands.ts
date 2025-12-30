import dayjs from "dayjs";
import { dataCy } from "./utils/common";

import { Result } from "axe-core";
import "cypress-axe";

Cypress.Commands.add("checkA11yPage", () => {
  cy.injectAxe();
  cy.checkA11y(null, null, violations => {
    cy.logAxeViolations(violations);
  });
});
Cypress.Commands.add("waitForLoadingToFinish", () => {
  cy.get("body").then($body => {
    const spinner = $body.find('[role="progressbar"]');

    if (spinner.length > 0) {
      return cy
        .get('[role="progressbar"]', { timeout: 20000 })
        .should("not.exist");
    }

    return;
  });
});
Cypress.Commands.add("logAxeViolations", violations => {
  cy.task(
    "log",
    `${violations.length} accessibility violation${violations.length === 1 ? "" : "s"} detected`
  );

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);

  violations.forEach(violation => {
    violation.nodes.forEach((node, index) => {
      cy.task(
        "log",
        `Violation: ${violation.id} | Node ${index + 1} | Selector: ${node.target.join(", ")}`
      );
      cy.task("log", `HTML snippet: ${node.html}`);
    });
  });
});

Cypress.Commands.add("login", (email: string, password: string) => {
  const args = { email, password };

  cy.session(args, () => {
    cy.origin(
      Cypress.env("keycloakBaseUrl"),
      { args },
      ({ email, password }) => {
        const { getKeycloakLoginPath } = Cypress.require("./utils/auth");

        cy.visit(getKeycloakLoginPath());

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

  // cy.get("body").click();
});

Cypress.Commands.add("getResultsRow", (index?: number | string | undefined) => {
  const tableRows = cy.get(dataCy("results")).find("tbody tr");

  if (!index) return tableRows;

  if (typeof index === "string") {
    if (index === "last") {
      return tableRows.last();
    }

    return tableRows.first();
  }

  return tableRows.eq(index);
});

Cypress.Commands.add("getResultsRowByValue", (value: string) => {
  const row =
    value === "first" || value === "last"
      ? cy.getResultsRow(value)
      : cy.get(dataCy("results")).should("exist").get("tbody tr");

  return row.contains("td", value).should("exist").parent();
});

Cypress.Commands.add("getLatestRowOfResults", () => {
  cy.get(dataCy("results"))
    .filter(":visible")
    .find("tbody tr")
    .then($row => {
      if ($row.length === 0) {
        cy.log("No row found, skipping pagination click");
        return;
      }

      cy.wrap($row).parents('div[data-cy="results"]').first().as("resultsDiv");

      cy.get("@resultsDiv")
        .find("nav button.MuiPaginationItem-page")
        .then($buttons => {
          if ($buttons.length > 1) {
            cy.wrap($buttons.last()).click();
          } else {
            cy.log("Only one page button, skipping click");
          }
        });
    });
});

Cypress.Commands.add("getResultsCellByValue", (value: string) => {
  return cy
    .get(dataCy("results"))
    .should("exist")
    .get("tbody tr")
    .contains("td", value);
});

Cypress.Commands.add("getResultsActionMenu", (value: string) => {
  return cy
    .getResultsRowByValue(value)
    .find("td")
    .siblings()
    .find(dataCy("action-menu"));
});

Cypress.Commands.add(
  "swalClick",
  (text: string = "OK", title: string = "Success") => {
    const swalContainer = cy.get(".swal2-container").should("be.visible");

    swalContainer.get(".swal2-title").contains(title);

    swalContainer.get("button").contains(text).click();
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

Cypress.Commands.add(
  "dateSelectValue",
  (id: string, value: string | null | undefined) => {
    if (!value) return;

    // Bug in pipeline where readonly is true in mui datepicker
    cy.get(`#${id}`).invoke("removeAttr", "readonly");
    cy.get(`#${id}`).clear();
    cy.get(`#${id}`).type(dayjs(value).format("DD/MM/YYYY"), {
      force: true,
    });
  }
);

Cypress.Commands.add("saveFormClick", (text: string = "Save") => {
  cy.get('[role="presentation"]:not([aria-hidden="true"])')
    .then($els => {
      if ($els.length === 0) {
        throw new Error("No matching elements found");
      }

      let elementToUse: HTMLElement;

      if ($els.length === 1) {
        elementToUse = $els[0];
        cy.log("Only one element found, using it directly");
      } else {
        cy.log(
          `${$els.length} elements found, selecting one with highest z-index`
        );
        const getZIndex = (el: Element) => {
          const z = window.getComputedStyle(el).zIndex;
          const parsed = parseInt(z ?? "0", 10);
          return isNaN(parsed) ? 0 : parsed;
        };

        elementToUse = Array.from($els).reduce((top, current) => {
          return getZIndex(current) > getZIndex(top) ? current : top;
        });
      }

      return cy.wrap(elementToUse);
    })
    .should("be.visible")
    .within(() => {
      cy.get("button").contains(text).click();
    });
});

Cypress.Commands.add(
  "saveContinueClick",
  (text: string = "Save & Continue") => {
    cy.contains("button", text).click();
  }
);

Cypress.Commands.add("solveGoogleReCAPTCHA", () => {
  // Wait until the iframe (Google reCAPTCHA) is totally loaded
  cy.wait(500);
  cy.get(".g-recaptcha *> iframe").then($iframe => {
    const $body = $iframe.contents().find("body");
    cy.wrap($body)
      .find(".recaptcha-checkbox-border")
      .should("be.visible")
      .click();
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login: (email: string, password: string) => void;
      dataCy: (value: string) => string;
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
      saveContinueClick: (text?: string) => void;
      getResultsActionMenu: (
        value: string
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      getResultsRowByValue: (
        value: string
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      getLatestRowOfResults: () => void;
      waitForLoadingToFinish: () => Cypress.Chainable<JQuery<HTMLElement>>;
      checkA11yPage: () => void;
      logAxeViolations: (violations: Result[]) => void;
      getResultsCellByValue: (
        value: string
      ) => Cypress.Chainable<JQuery<HTMLTableCellElement>>;
      solveGoogleReCAPTCHA: () => void;
    }
  }
}
