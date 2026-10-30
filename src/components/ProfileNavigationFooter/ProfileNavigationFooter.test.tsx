import { render, screen } from "@/utils/testUtils";
import ProfileNavigationFooter from "./ProfileNavigationFooter";

describe("<ProfileNavigationFooter />", () => {
  it("shows the previous link and the save button", () => {
    render(<ProfileNavigationFooter previousHref="/previous" />);

    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/previous"
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("hides the save button when there is nothing to save", () => {
    render(
      <ProfileNavigationFooter previousHref="/previous" hideSubmitButton />
    );

    expect(screen.getByRole("link", { name: "Previous" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save" })
    ).not.toBeInTheDocument();
  });

  it("hides the next link when there is nothing to save", () => {
    render(
      <ProfileNavigationFooter
        previousHref="/previous"
        nextHref="/next"
        hideSubmitButton
      />
    );

    expect(
      screen.queryByRole("link", { name: "Save" })
    ).not.toBeInTheDocument();
  });
});
