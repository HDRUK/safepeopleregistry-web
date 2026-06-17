import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ActionCard from "./ActionCard";

const defaultProps = {
  icon: <MailOutlineIcon />,
  title: "Test title",
  description: "Test description",
  href: "https://example.com",
  ctaLabel: "Click me",
};

const renderComponent = () => render(<ActionCard {...defaultProps} />);

describe("<ActionCard />", () => {
  it("renders the title", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: "Test title" })
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderComponent();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders the CTA label", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: /Click me/i })).toBeInTheDocument();
  });

  it("renders a link with the correct href", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: /Click me/i })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderComponent());
  });
});
