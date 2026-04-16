import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { putUserNotification } from "@/app/actions/notifications";
import {
  screen,
  render,
  waitFor,
  fireEvent,
  commonAccessibilityTests,
} from "../../utils/testUtils";
import { NotificationPutType } from "../../services/notifications/types";
import { NOTIFICATIONS_PER_PAGE } from "../../consts/notifications";
import NotificationsMenu from "./NotificationsMenu";

const defaultUser = mockedUser({
  id: 1,
});

jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

jest.mock("@/app/actions/notifications/putUserNotification", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<NotificationsMenu />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the notifications icon with a badge count", async () => {
    render(<NotificationsMenu />);
    expect(screen.getByTestId("notifications-button")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("notifications-badge")).toHaveTextContent("10");
    });
  });

  it("opens and displays notifications when clicked", async () => {
    render(<NotificationsMenu />);

    fireEvent.click(screen.getByTestId("notifications-button"));

    await waitFor(() => {
      expect(screen.getByTestId("notifications-menu")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("notification-item")).toHaveLength(
        NOTIFICATIONS_PER_PAGE
      );
    });
  });

  it("loads more notifications when scrolled to bottom", async () => {
    render(<NotificationsMenu />);
    fireEvent.click(screen.getByTestId("notifications-button"));

    await waitFor(() => {
      expect(screen.getAllByTestId("notification-item")).toHaveLength(
        NOTIFICATIONS_PER_PAGE
      );
    });

    const menuPaper = document.querySelector(".MuiPaper-root") as HTMLElement;
    if (!menuPaper) throw new Error("Scrollable Menu Paper element not found!");

    Object.defineProperty(menuPaper, "scrollHeight", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(menuPaper, "clientHeight", {
      configurable: true,
      value: 300,
    });

    fireEvent.scroll(menuPaper, {
      target: { scrollTop: menuPaper.scrollHeight - menuPaper.clientHeight },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("notification-item")).toHaveLength(
        NOTIFICATIONS_PER_PAGE * 2
      );
    });
  });

  it("opens modal when a notification item is clicked", async () => {
    render(<NotificationsMenu />);

    fireEvent.click(screen.getByTestId("notifications-button"));

    await waitFor(() => {
      expect(screen.getByTestId("notifications-menu")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("notification-item")).toHaveLength(
        NOTIFICATIONS_PER_PAGE
      );
    });

    const mockPutNotification = putUserNotification as jest.Mock;

    const firstNotification = screen.getAllByTestId("notification-item")[0];
    fireEvent.click(firstNotification);

    await waitFor(() => {
      expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPutNotification).toHaveBeenCalledTimes(1);
    });

    expect(mockPutNotification).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(String),
      NotificationPutType.READ,
      expect.objectContaining({ suppressThrow: true })
    );

    const modalHeader = screen.getByTestId("notification-modal-header");
    const modalHeaderText =
      modalHeader.textContent?.split(" details changed!")[0];
    const notificationText = firstNotification.textContent;

    expect(modalHeader).toBeInTheDocument();
    expect(notificationText).toContain(modalHeaderText);

    fireEvent.click(screen.getByTestId("mark-notification-as-unread-button"));

    mockPutNotification.mockClear();

    await waitFor(() => {
      expect(mockPutNotification).toHaveBeenCalledTimes(1);
    });

    expect(mockPutNotification).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(String),
      NotificationPutType.UNREAD,
      expect.objectContaining({ suppressThrow: true })
    );
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<NotificationsMenu />));
  });
});
