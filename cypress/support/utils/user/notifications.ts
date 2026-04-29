const openNotificationsMenu = () => {
  cy.get('[data-testid="notifications-button"]').click();
  cy.get('[data-testid="notifications-menu"]').should("be.visible");
};

const hasNotificationsMenu = () => {
  cy.get('[data-testid="notifications-button"]').should("exist");
};

const hasNoNotifications = () => {
  openNotificationsMenu();
  cy.contains("You have no notifications!").should("be.visible");
};

const hasNotificationItems = () => {
  openNotificationsMenu();
  cy.get('[role="menuitem"]').should("have.length.greaterThan", 0);
};

const openFirstNotification = () => {
  openNotificationsMenu();
  cy.get('[data-testid="notification-item"]').first().click();
};

const closeNotificationsMenu = () => {
  cy.get("body").click(0, 0);
  cy.get('[data-testid="notifications-menu"]').should("not.exist");
};

export {
  closeNotificationsMenu,
  hasNoNotifications,
  hasNotificationItems,
  hasNotificationsMenu,
  openFirstNotification,
  openNotificationsMenu,
};
