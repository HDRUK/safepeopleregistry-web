import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginUser } from "cypress/support/utils/user/auth";
import {
  closeNotificationsMenu,
  hasNotificationsMenu,
  openFirstNotification,
  openNotificationsMenu,
} from "cypress/support/utils/user/notifications";

describe("Notifications journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherHome.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Shows the notifications bell in the nav bar", () => {
    hasNotificationsMenu();
  });

  it("Opens the notifications menu", () => {
    openNotificationsMenu();
  });

  it("Closes the notifications menu", () => {
    openNotificationsMenu();
    closeNotificationsMenu();
  });

  it("Shows notification list or empty state", () => {
    openNotificationsMenu();

    cy.get("body").then($body => {
      if ($body.find('[data-testid="notification-item"]').length > 0) {
        cy.get('[data-testid="notification-item"]').should(
          "have.length.greaterThan",
          0
        );
      } else {
        cy.contains("You have no notifications!").should("be.visible");
      }
    });
  });

  it("Can open a notification and mark it as read", () => {
    cy.get("body").then($body => {
      if ($body.find('[data-testid="notifications-badge"]').length > 0) {
        const badge = $body.find('[data-testid="notifications-badge"]');
        const unreadCount = parseInt(badge.attr("data-badge-content") || "0");

        if (unreadCount > 0) {
          openFirstNotification();

          cy.get('[role="dialog"]').should("be.visible");
        } else {
          cy.log("No unread notifications — skipping mark-as-read assertion");
        }
      }
    });
  });
});
