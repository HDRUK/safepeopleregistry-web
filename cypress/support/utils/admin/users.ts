import { Status } from "@/consts/application";
import { User } from "@/types/application";
import { getName, getStatus } from "@/utils/application";

const hasUser = (user: User, status: Status) => {
  cy.contains("Users").click();

  const row = cy.getResultsRowByValue(user.email);

  row.within(() => {
    cy.contains("td", getName(user));
    cy.contains("td", user.email);
    cy.contains("td", getStatus(status));
  });
};

export { hasUser };
