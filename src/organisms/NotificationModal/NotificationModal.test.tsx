import { mockedNotification } from "@/mocks/data/notification";
import { Notification } from "@/types/notifications";
import { render, screen, within } from "../../utils/testUtils";
import NotificationModal from "./NotificationModal";

const FlatNotification = mockedNotification(true, {
  data: {
    message:
      "Data Custodian Custodian Admin changed the project details for Analyzing Health Data to Identify Resilient Smokers: A Study on Tolerance to Tobacco Use.",
    details: {
      start_date: { old: "2024-06-01", new: "2024-06-01 00:00:00" },
      end_date: { old: "2025-12-31", new: "2025-12-31 00:00:00" },
      location: { old: null, new: "United Kingdom" },
    } as unknown as Notification["data"]["details"],
    time: "2026-06-15T16:45:39.221575Z",
  },
});

const OldNewNotification = mockedNotification(true, {
  data: {
    message: "Organisation details changed!",
    details: {
      old: { name: "Old name", status: "Pending" },
      new: { name: "New name", status: "Approved", sector: "Health" },
    } as unknown as Notification["data"]["details"],
    time: "2026-04-01T09:30:00.000000Z",
  },
});

const renderModal = (notification: Notification) =>
  render(
    <NotificationModal
      open
      notification={notification}
      onClose={jest.fn()}
      handleMarkAsUnread={jest.fn()}
    />
  );

describe("<NotificationModal />", () => {
  it.each([
    {
      name: "per-field old/new",
      notification: FlatNotification,
      expectedRows: [
        ["start_date", "2024-06-01", "2024-06-01 00:00:00"],
        ["end_date", "2025-12-31", "2025-12-31 00:00:00"],
        ["location", "—", "United Kingdom"],
      ],
    },
    {
      name: "top-level old/new objects",
      notification: OldNewNotification,
      expectedRows: [
        ["name", "Old name", "New name"],
        ["status", "Pending", "Approved"],
        ["sector", "—", "Health"],
      ],
    },
  ])(
    "renders the modal for a $name notification",
    ({ notification, expectedRows }) => {
      renderModal(notification);

      expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
      expect(screen.getByTestId("notification-modal-header")).toHaveTextContent(
        notification.data.message
      );

      expectedRows.forEach(([field, oldValue, newValue]) => {
        const row = screen.getByRole("rowheader", { name: field })
          .parentElement as HTMLElement;
        const cells = within(row).getAllByRole("cell");

        expect(cells[0]).toHaveTextContent(oldValue);
        expect(cells[1]).toHaveTextContent(newValue);
      });
    }
  );
});
