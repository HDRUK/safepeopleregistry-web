import { render, screen } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import FAQContent from "./FAQContent";

jest.mock("next-intl/server");

describe("FAQContent", () => {
  it("renders the page heading", async () => {
    const Component = await FAQContent();
    render(Component);

    expect(
      screen.getByRole("heading", { name: /Frequently Asked Questions/i })
    ).toBeInTheDocument();
  });

  it("renders all section headings", async () => {
    const Component = await FAQContent();
    render(Component);

    expect(
      screen.getByRole("heading", { name: "General FAQs" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Organisations" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Data Custodians" })
    ).toBeInTheDocument();
  });

  it("renders questions from each section", async () => {
    const Component = await FAQContent();
    render(Component);

    expect(
      screen.getByText(
        "How does the Safe People Registry keep personal information secure?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can I be associated with more than one Organisation?")
    ).toBeInTheDocument();
  });

  it("shows a multi-paragraph answer when an accordion is expanded", async () => {
    const Component = await FAQContent();
    render(Component);

    await userEvent.click(
      screen.getByText(
        "How does the Safe People Registry keep personal information secure?"
      )
    );

    expect(
      screen.getByText(/does not, itself, host any of the secure data/i)
    ).toBeInTheDocument();
  });

  it("renders the contact email in an answer as a mailto link", async () => {
    const Component = await FAQContent();
    render(Component);

    await userEvent.click(
      screen.getByText(
        "How does an Organisation get added to the Safe People Registry?"
      )
    );

    expect(
      screen.getByRole("link", { name: "enquiries@safepeopleregistry.org" })
    ).toHaveAttribute("href", `mailto:${CONTACT_MAIL_ADDRESS}`);
  });
});
