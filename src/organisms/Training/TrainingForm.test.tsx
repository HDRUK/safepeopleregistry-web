import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { mock200Json } from "jest.utils";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import { postTrainings } from "../../services/trainings";
import TrainingForm from "./TrainingForm";

jest.mock("../../services/trainings");

const mockSetUser = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `
    {"identity": {"dob": false, "score": 67, "last_name": true, "first_name": true}}
  `,
  profile_completed_at: null,
});

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);

(postTrainings as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

const renderTrainingFormComponent = () => {
  return render(
    <TrainingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
  );
};

describe("<TrainingForm />", () => {
  beforeEach(() => {
    mockUseStore({
      user: defaultUser,
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    "Training course name",
    "Training provider",
    "Date awarded",
    "Expiry date",
  ])("does not submit when %s is not defined", async fieldName => {
    renderTrainingFormComponent();

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
      if (
        input.getAttribute("name") !==
        fieldName.toLowerCase().replace(/\s/g, "_")
      ) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });
      }
    });

    const dateInputs = screen.getAllByRole("textbox", { name: /date/i });
    dateInputs.forEach(input => {
      if (
        input.getAttribute("name") !==
        fieldName.toLowerCase().replace(/\s/g, "_")
      ) {
        fireEvent.change(input, {
          target: { value: faker.date.future().toISOString().split("T")[0] },
        });
      }
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();

    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /save/i }));
    });

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    renderTrainingFormComponent();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTrainingFormComponent());
  });
});
