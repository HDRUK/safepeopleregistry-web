import { render, screen } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { commonAccessibilityTests } from "@/utils/testUtils";
import FAQAccordion from "./FAQAccordion";
import { FAQSection } from "@/types/faq";

const mockSections: FAQSection[] = [
  {
    id: "general",
    label: "General",
    questions: [
      {
        id: "general-q1",
        question: "What is this?",
        answer: ["This is a single paragraph answer."],
      },
      {
        id: "general-q2",
        question: "How does it work?",
        answer: ["First paragraph.", "Second paragraph."],
      },
    ],
  },
  {
    id: "users",
    label: "Users",
    questions: [
      {
        id: "users-q1",
        question: "Can I register?",
        answer: ["Yes, you can register."],
      },
    ],
  },
];

const renderComponent = () =>
  render(
    <FAQAccordion
      sectionSelectorTitle="Jump to section"
      sections={mockSections}
    />
  );

beforeEach(() => {
  window.scrollTo = jest.fn();
});

describe("FAQAccordion", () => {
  it("renders all section headings", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "General" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
  });

  it("renders all questions", () => {
    renderComponent();

    expect(screen.getByText("What is this?")).toBeInTheDocument();
    expect(screen.getByText("How does it work?")).toBeInTheDocument();
    expect(screen.getByText("Can I register?")).toBeInTheDocument();
  });

  it("renders the section selector title in the sidebar", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Jump to section" })
    ).toBeInTheDocument();
  });

  it("renders a radio button for each section in the sidebar", () => {
    renderComponent();

    expect(screen.getByRole("radio", { name: "General" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Users" })).toBeInTheDocument();
  });

  it("renders a select option for each section in the mobile nav", async () => {
    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByRole("combobox", { name: "Jump to section" }));

    expect(screen.getByRole("option", { name: "General" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Users" })).toBeInTheDocument();
  });

  it("shows answer paragraphs when an accordion is expanded", async () => {
    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByText("What is this?"));

    expect(
      screen.getByText("This is a single paragraph answer.")
    ).toBeVisible();
  });

  it("renders multi-paragraph answers when an accordion is expanded", async () => {
    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByText("How does it work?"));

    expect(screen.getByText("First paragraph.")).toBeVisible();
    expect(screen.getByText("Second paragraph.")).toBeVisible();
  });

  it("calls window.scrollTo when a radio button is selected", async () => {
    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByRole("radio", { name: "Users" }));

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it("passes accessibility checks", async () => {
    const rendered = renderComponent();
    await commonAccessibilityTests(rendered);
  });
});
