import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useFeatures } from "@/components/FeatureProvider";
import { mockedProject } from "@/mocks/data/project";
import { EntityType } from "@/types/api";
import ProjectsSafeProjectForm, {
  ProjectsSafeProjectFormProps,
} from "./ProjectsSafeProjectForm";

jest.mock("@/components/FeatureProvider", () => ({
  ...jest.requireActual("@/components/FeatureProvider"),
  useFeatures: jest.fn(() => ({})),
}));

const mockedUseFeatures = jest.mocked(useFeatures);

const defaultProps: ProjectsSafeProjectFormProps = {
  entityType: EntityType.CUSTODIAN,
  entityId: 1,
  mutateState: { isPending: false, isError: false, isSuccess: false },
  onSubmit: jest.fn(),
  defaultValues: mockedProject({
    unique_id: "123",
  }),
  project: mockedProject(),
};

function setupTest(props?: Partial<ProjectsSafeProjectFormProps>) {
  return render(<ProjectsSafeProjectForm {...defaultProps} {...props} />);
}

function getAllInputs() {
  return [
    /ID/,
    /Name/,
    /Category/,
    "start_date",
    "end_date",
    /Lay summary/,
    /Public benefit statement/,
    /Technical summary/,
    /Approved/,
    /Pending approval/,
    /Completed/,
  ];
}

describe("<ProjectsSafeProjectForm />", () => {
  beforeEach(() => {
    mockedUseFeatures.mockReturnValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      if (typeof selector === "string") {
        expect(screen.getByTestId(selector)).toBeInTheDocument();
      } else {
        expect(screen.getByLabelText(selector)).toBeInTheDocument();
      }
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        defaultProps.defaultValues
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    const textInputs = [
      /ID/,
      /Name/,
      /Lay summary/,
      /Public benefit statement/,
      /Technical summary/,
    ];

    // Awaited one at a time: the shared clearInputsByLabelText helper doesn't
    // await its clears, so they can leak into later tests
    for (const selector of textInputs) {
      await clearInput(screen.getAllByLabelText(selector)[0]);
    }

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("when selecting a sponsor", () => {
    beforeEach(() => {
      mockedUseFeatures.mockReturnValue({ isSponsorship: true });
    });

    it("shows unapproved organisations to a Custodian as pending approval", async () => {
      setupTest();

      fireEvent.mouseDown(
        await screen.findByRole("combobox", { name: /sponsor/i })
      );

      expect(
        await screen.findByRole("option", { name: /Organisation 1/ })
      ).toHaveTextContent("Pending approval by HDR UK");
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
