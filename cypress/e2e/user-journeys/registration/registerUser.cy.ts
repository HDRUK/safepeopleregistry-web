import { ROUTES } from "@/consts/router";
import {
  acceptTermsAndConditions,
  checkTermsAndConditionsContent,
  openUserTermsAndConditions,
  registerKeycloak,
} from "cypress/support/utils/registration/register";

const mockedRegistration = {
  first_name: "Test",
  last_name: "User",
  email: `test.user+${Cypress._.random(0, 1e6)}@example.com`,
  password: "Password123!",
  password_confirm: "Password123!",
};

describe("Register user journey", () => {
  beforeEach(() => {
    cy.visitFirst(ROUTES.homepage.path);
  });

  // it("Triggers the terms and conditions", () => {
  //   cy.contains("button", "Register").click();
  //   cy.contains("button[disabled]", "Continue").should("exist");

  //   cy.contains("button", /User/i).click();

  //   cy.contains("button", "Continue").click();
  // });

  // it("Has the correct Terms and Conditions content", () => {
  //   openUserTermsAndConditions();

  //   checkTermsAndConditionsContent(
  //     /Understanding the Terms/i,
  //     /UNDERSTANDING THESE TERMS OF USE/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Researcher Usage/i,
  //     /USE OF THE SAFE PEOPLE REGISTRY BY RESEARCHERS/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Account Management/i,
  //     /YOUR ACCOUNT AND PASSWORD/i
  //   );
  //   checkTermsAndConditionsContent(/Acceptable Use/i, /ACCEPTABLE USE/i);
  //   checkTermsAndConditionsContent(
  //     /Intellectual Property/i,
  //     /INTELLECTUAL PROPERTY/i
  //   );
  //   checkTermsAndConditionsContent(/Input Data/i, /INPUT DATA/i);
  //   checkTermsAndConditionsContent(/Liability/i, /OUR LIABILITY/i);
  //   checkTermsAndConditionsContent(
  //     /Usage/i,
  //     /USE OF THE SAFE PEOPLE REGISTRY/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Suspension of Access/i,
  //     /SUSPENSION AND TERMINATION/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Changes to Terms/i,
  //     /CHANGES TO THESE TERMS/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Third Party Services/i,
  //     /THIRD PARTY CONTENT/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Other Terms/i,
  //     /OTHER IMPORTANT INFORMATION/i
  //   );
  //   checkTermsAndConditionsContent(
  //     /Governing Law/i,
  //     /GOVERNING LAW AND JURISDICTION/i
  //   );
  //   checkTermsAndConditionsContent(/Contact Information/i, /CONTACTING US/i);
  // });

  it("Registers the user", () => {
    openUserTermsAndConditions();

    acceptTermsAndConditions();

    registerKeycloak(mockedRegistration);

    cy.maildevGetLastMessage().then(email => {
      const emailHtml = Cypress.$(email.html);

      const verifyLink = emailHtml.find("a").filter((_, el) => {
        return el.textContent === "Link to e-mail address verification";
      });

      const verifyHref = verifyLink.attr("href");

      if (!verifyHref) {
        throw new Error("Verification email doesn't exist");
      } else {
        cy.visit(verifyHref);
      }
    });

    // cy.visit(Cypress.env("mailUrl"));

    // cy.contains("a", /Inbox/i).click();

    // cy.contains(/Verify email/i).click();

    // cy.get("iframe").then($iframe => {
    //   const $body = $iframe.contents().find("body");

    //   cy.wrap($body).within(() => {
    //     cy.contains("Link to e-mail address verification");
    //   });

    //   const verifyLink = $body.find("a").filter((_, el) => {
    //     return el.textContent === "Link to e-mail address verification";
    //   });

    //   const verifyHref = verifyLink.attr("href");

    //   if (!verifyHref) {
    //     throw new Error("Verification email doesn't exist");
    //   } else {
    //     cy.visit(verifyHref);
    //   }

    //   cy.url().should("eq", `${Cypress.env("keycloakBaseUrl")}/user/profile`);
    // });
  });
});
