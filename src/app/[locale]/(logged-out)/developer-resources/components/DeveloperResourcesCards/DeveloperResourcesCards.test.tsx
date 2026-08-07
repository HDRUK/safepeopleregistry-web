import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import links from "@/consts/links";
import DeveloperResourcesCards from "./DeveloperResourcesCards";

describe("<DeveloperResourcesCards />", () => {
  it("renders all six cards", () => {
    render(<DeveloperResourcesCards />);
    expect(
      screen.getByRole("heading", { name: /api documentation/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /java sdk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /c# sdk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /python sdk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /go sdk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /typescript sdk/i })
    ).toBeInTheDocument();
  });

  it("links each card to the correct href", () => {
    render(<DeveloperResourcesCards />);

    const hrefs = screen.getAllByRole("link").map(l => l.getAttribute("href"));
    expect(hrefs).toContain(links.developerResources.apiDocumentation);
    expect(hrefs).toContain(links.developerResources.sdkJava);
    expect(hrefs).toContain(links.developerResources.sdkCSharp);
    expect(hrefs).toContain(links.developerResources.sdkPython);
    expect(hrefs).toContain(links.developerResources.sdkGo);
    expect(hrefs).toContain(links.developerResources.sdkTypescript);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<DeveloperResourcesCards />));
  });
});
