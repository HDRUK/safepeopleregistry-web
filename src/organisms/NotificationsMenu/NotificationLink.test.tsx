import { NotificationLinkType } from "@/consts/notifications";
import { fireEvent, render, screen } from "@/utils/testUtils";
import NotificationLink from "./NotificationLink";

describe("<NotificationLink />", () => {
  it("links an Organisation to the user's profile", () => {
    const onNavigate = jest.fn();
    const onParentClick = jest.fn();

    render(
      <div onClick={onParentClick}>
        <NotificationLink
          link={{ type: NotificationLinkType.ORGANISATION_USER, id: 7 }}
          onNavigate={onNavigate}
        />
      </div>
    );

    const link = screen.getByRole("link", { name: "Go to user profile" });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining(
        "/organisation/profile/user-administration/employees-and-students/7/identity"
      )
    );

    fireEvent.click(link);

    expect(onNavigate).toHaveBeenCalled();
    expect(onParentClick).not.toHaveBeenCalled();
  });

  it("shows nothing for a link it does not know", () => {
    render(
      <NotificationLink
        link={{ type: "unknown" as NotificationLinkType, id: 7 }}
      />
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
