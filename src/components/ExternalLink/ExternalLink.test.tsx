import ExternalLink from ".";
import { render, commonAccessibilityTests } from "../../utils/testUtils";

describe("ExternalLink", () => {
  const href = "https://example.com";

  it("renders an anchor with the correct href", () => {
    const { getByRole } = render(
      <ExternalLink href={href}>Visit example</ExternalLink>
    );
    expect(getByRole("link")).toHaveAttribute("href", href);
  });

  it("always opens in a new tab", () => {
    const { getByRole } = render(
      <ExternalLink href={href}>Visit example</ExternalLink>
    );
    expect(getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("always sets rel=noreferrer", () => {
    const { getByRole } = render(
      <ExternalLink href={href}>Visit example</ExternalLink>
    );
    expect(getByRole("link")).toHaveAttribute("rel", "noreferrer");
  });

  it("renders children", () => {
    const { getByText } = render(
      <ExternalLink href={href}>Link text</ExternalLink>
    );
    expect(getByText("Link text")).toBeInTheDocument();
  });

  it("includes a visually-hidden new-tab notice for screen readers", () => {
    const { getByText } = render(
      <ExternalLink href={href}>Visit example</ExternalLink>
    );
    const notice = getByText("(opens in a new tab)");
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveStyle({ position: "absolute" });
  });

  it("forwards additional props to the anchor", () => {
    const { getByRole } = render(
      <ExternalLink href={href} data-testid="my-link">
        Visit example
      </ExternalLink>
    );
    expect(getByRole("link")).toHaveAttribute("data-testid", "my-link");
  });

  it("passes accessibility checks", async () => {
    const rendered = render(
      <ExternalLink href={href}>Visit example</ExternalLink>
    );
    await commonAccessibilityTests(rendered);
  });
});
