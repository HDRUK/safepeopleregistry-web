import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Home", path: `/en${ROUTES.profileCustodianHome.path}` },
    { name: "Users", path: `/en${ROUTES.profileCustodianUsers.path}` },
    { name: "Team", path: `/en${ROUTES.profileCustodianContacts.path}` },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections tabId={name as PageTabs} />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", path);
  });
});
