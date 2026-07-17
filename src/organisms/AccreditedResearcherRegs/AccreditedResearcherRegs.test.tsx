import { useStore } from "@/data/store";
import { mockedTraining, mockedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { mock200Json } from "jest.utils";
import { useRouter } from "next/navigation";
import {
  getAccreditations,
  postAccreditations,
} from "@/app/actions/accreditations";
import { EntityType } from "../../types/api";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import AccreditatedResearchRegs from "./AccreditedResearcherRegs";

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

jest.mock("@/app/actions/accreditations");
jest.mock("@/data/store");

const mockSetUser = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `
    {"identity": {"dob": false, "score": 67, "last_name": true, "first_name": true}}
  `,
  profile_completed_at: null,
});

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);

(getAccreditations as jest.Mock).mockResolvedValue({
  data: [mockedTraining],
});
(postAccreditations as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);
const renderTrainingComponent = () => {
  return render(<AccreditatedResearchRegs variant={EntityType.USER} />);
};

describe("<AccreditatedResearchRegs />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([/Associated organisation name/i, /ID/i])(
    "does not submit when %s is not defined",
    async fieldName => {
      renderTrainingComponent();

      const addButton = screen.getByRole("button", {
        name: /add researcher accreditation/i,
      });
      fireEvent.click(addButton);

      const input = screen.getByRole("textbox", { name: fieldName });
      fireEvent.change(input, { target: { value: faker.string.sample() } });

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument();
      });

      expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();

      act(() => {
        fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
      });

      await waitFor(() => {
        expect(postAccreditations).not.toHaveBeenCalled();
      });
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTrainingComponent());
  });
});
