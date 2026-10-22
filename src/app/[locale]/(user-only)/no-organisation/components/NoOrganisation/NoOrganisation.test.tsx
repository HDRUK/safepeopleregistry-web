import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { handleLogout } from "@/utils/keycloak";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import NoOrganisation from "./NoOrganisation";

jest.mock("@/utils/keycloak", () => ({
  handleLogout: jest.fn(),
}));

describe("<NoOrganisation />", () => {
  it("tells the user they are no longer linked to an organisation", () => {
    render(<NoOrganisation />);

    expect(
      screen.getByRole("heading", {
        name: "Your account is no longer linked to an organisation",
      })
    ).toBeInTheDocument();
  });

  it("directs the user to support for help", () => {
    render(<NoOrganisation />);

    expect(
      screen.getByRole("link", { name: CONTACT_MAIL_ADDRESS })
    ).toHaveAttribute("href", `mailto:${CONTACT_MAIL_ADDRESS}`);
  });

  it("lets the user sign out", () => {
    render(<NoOrganisation />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(handleLogout).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<NoOrganisation />));
  });
});
