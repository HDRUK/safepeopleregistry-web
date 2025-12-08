const hasUnCheckedOnUsersConfigurationAutomatedFlags = () => {
  cy.get('#10').uncheck();
  cy.contains("p", "Identity").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "A User has verified their identity via the Identity Verification Technology (IDVT)."
  ).should("exist");
  cy.get("#11").should("exist").uncheck();
  cy.contains("p", "User location").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "A User is located in a country which has UK equivalent data protection laws."
  ).should("exist");
  cy.get("#12").should("exist").uncheck();
  cy.contains("p", "Training").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "A User has completed the NHS Research Secure Data Environment training."
  ).should("exist");
  cy.get("#13").should("exist").uncheck();
  cy.contains("p", "Training").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "A User has completed the ONS Accredited Researcher training."
  ).should("exist");
  cy.get("#14").should("exist").uncheck();
  cy.contains("p", "Training").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains("p", "A User has completed the MRC GDPR training.").should(
    "exist"
  );
  cy.get("#15").should("exist").uncheck();
  cy.contains("p", "User affiliation").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "A User has been affiliated by a relevant, validated Organisation."
  ).should("exist");
  cy.saveContinueClick("Save");
  cy.swalClick();
};

const hasCheckedOnUsersConfigurationAutomatedFlags = () => {
  cy.get("#10").should("exist").check();
  cy.get("#11").should("exist").check();
  cy.get("#12").should("exist").check();
  cy.get("#13").should("exist").check();
  cy.get("#14").should("exist").check();
  cy.get("#15").should("exist").check();
  cy.saveContinueClick("Save");
  cy.swalClick();
};

const hasUnCheckedOnOrganisationConfigurationAutomatedFlags = () => {
  cy.get("#16").should("exist").uncheck();
  cy.contains("p", "Sanctions").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains("p", "An Organisation is not on the UK sanctions list.").should(
    "exist"
  );
  cy.get("#17").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has Cyber Essentials certification."
  ).should("exist");
  cy.get("#18").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has Cyber Essentials Plus certification."
  ).should("exist");
  cy.get("#19").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has ISO27001 Accredited certification."
  ).should("exist");
  cy.get("#20").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has either a Cyber Essentials or ISO27001 Accredited certification."
  ).should("exist");
  cy.get("#21").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has either a Cyber Essentials Plus or ISO27001 Accredited certification."
  ).should("exist");
  cy.get("#22").should("exist").uncheck();
  cy.contains("p", "Data security compliance:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains("p", "An Organisation has DSPT certification.").should("exist");
  cy.get("#23").should("exist").uncheck();
  cy.contains("p", "Delegate/Key Contact:").should("exist");
  cy.contains("p", ":").should("exist");
  cy.contains(
    "p",
    "An Organisation has at least one Delegate/Key Contact to affiliate Users."
  ).should("exist");
  cy.saveContinueClick("Save");
  cy.swalClick();
};

const hasCheckedOnOrganisationConfigurationAutomatedFlags = () => {
  cy.get("#16").should("exist").check();
  cy.get("#17").should("exist").check();
  cy.get("#18").should("exist").check();
  cy.get("#19").should("exist").check();
  cy.get("#20").should("exist").check();
  cy.get("#21").should("exist").check();
  cy.get("#22").should("exist").check();
  cy.get("#23").should("exist").check();
  cy.saveContinueClick("Save");
  cy.swalClick();
};

export {
  hasUnCheckedOnUsersConfigurationAutomatedFlags,
  hasCheckedOnUsersConfigurationAutomatedFlags,
  hasUnCheckedOnOrganisationConfigurationAutomatedFlags,
  hasCheckedOnOrganisationConfigurationAutomatedFlags,
};
