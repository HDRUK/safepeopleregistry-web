import { render, screen } from "../../utils/testUtils";
import InfoHero, { InfoHeroProps } from "./InfoHero";

// Mock next-intl
jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(() => {
    const t = (key: string) => {
      if (key === "title") return "Test Title";
      if (key === "content") return "Some content";
      return key;
    };

    t.rich = (key: string) => {
      if (key === "content") {
        return (
          <>
            Some content with <strong>bold text</strong> and{" "}
            <a href="https://healthdatagateway.org/en/about/meet-the-team">
              tech link
            </a>{" "}
            and <a href="#">help link</a>
          </>
        );
      }

      return <>Test Title</>;
    };

    return t;
  }),
}));

const renderInfoHero = async (props?: Partial<InfoHeroProps>) => {
  const Component = await InfoHero({
    translationPath: props?.translationPath ?? "hero",
  });

  return render(Component);
};

describe("<InfoHero />", () => {
  it("renders hero title and content", async () => {
    await renderInfoHero();

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText(/Some content/i)).toBeInTheDocument();
  });

  it("renders external tech link correctly", async () => {
    await renderInfoHero();

    const link = screen.getByRole("link", { name: /tech link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://healthdatagateway.org/en/about/meet-the-team"
    );
  });

  it("renders help link correctly", async () => {
    await renderInfoHero();

    const link = screen.getByRole("link", { name: /help link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#");
  });

  it("renders bold text from rich translation", async () => {
    await renderInfoHero();

    expect(
      screen.getByText("bold text", { selector: "strong" })
    ).toBeInTheDocument();
  });

  it("renders container", async () => {
    const { container } = await renderInfoHero();

    expect(container.firstChild).toBeInTheDocument();
  });
});
