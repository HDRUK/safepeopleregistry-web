import {
  act,
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import { Status } from "@/consts/application";
import ProjectsFilters, { ProjectsFiltersProps } from "./ProjectsFilters";

const defaultProps = {
  updateQueryParams: jest.fn(),
  resetQueryParams: jest.fn(),
  handleSortToggle: jest.fn(),
  handleFieldToggle: jest.fn(),
  queryParams: {},
};

const setupTest = (props?: Partial<ProjectsFiltersProps>) => {
  return render(<ProjectsFilters {...defaultProps} {...props} />);
};

describe("<ProjectsFilters />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits a search", async () => {
    setupTest();

    await act(async () => {
      const searchInput = screen.getByRole("textbox");

      await userEvent.type(searchInput, "hdruk{enter}");
    });

    await waitFor(() => {
      expect(defaultProps.updateQueryParams).toHaveBeenCalledWith({
        "title[]": "hdruk",
      });
    });
  });

  it("filters by date", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText(/Filter by date/, "Past projects", {
        component: "ActionList",
      });
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith("active", [
        "0",
        undefined,
      ]);
    });
  });

  it("filters by status", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText(/Filter by status/, "Approved", {
        component: "ActionList",
      });
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith(
        "filter",
        [Status.PROJECT_APPROVED, undefined],
        true
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
