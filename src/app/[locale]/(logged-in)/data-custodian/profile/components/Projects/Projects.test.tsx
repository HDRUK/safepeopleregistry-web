import {
  commonAccessibilityTests,
  render,
  screen,
  within,
} from "@/utils/testUtils";
import Projects from "./Projects";

const mockPush = jest.fn();

jest.mock("@/i18n/routing", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams("")),
}));

const renderProjects = () => {
  return render(<Projects />);
};

describe("<Projects />", () => {
  it("projects are listed", async () => {
    renderProjects();

    const rowgroup = await screen.findAllByRole("rowgroup");
    const rows = within(rowgroup[1]).getAllByRole("row");

    expect(rows).toHaveLength(5);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects());
  });
});
