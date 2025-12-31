import { faker } from "@faker-js/faker";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import InviteOrganisation from "./InviteOrganisation";

jest.mock("@/data/store");

const mockSubmit = jest.fn();
const mockCancel = jest.fn();

const renderInviteOrganisationComponent = () => {
  return render(
    <InviteOrganisation
      t={(key: string) => key}
      onSubmit={mockSubmit}
      onCancel={mockCancel}
      queryState={{
        isPending: false,
        isError: false,
        error: "",
      }}
    />
  );
};

describe("<InviteOrganisation />", () => {
  it.each(["organisation_name", "lead_applicant_email"])(
    "does not submit when %s is not defined",
    async fieldName => {
      const { container } = renderInviteOrganisationComponent();

      const input = container.querySelector(`input[name=${fieldName}]`);

      if (input) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });

        const button = screen.getByRole("button", { name: /invite/i });

        await act(() => {
          fireEvent.submit(button);
        });

        expect(button).not.toBeDisabled();

        await waitFor(() => {
          expect(mockSubmit).not.toHaveBeenCalled();
        });
      } else {
        throw new Error(`Could not find input ${fieldName}`);
      }
    }
  );

  it("submits with the correct fields", async () => {
    renderInviteOrganisationComponent();

    [/Organisation name/i, /Email/i].forEach(name => {
      const input = screen.getByRole("textbox", { name });
      const inputValue = faker.internet.email();

      fireEvent.change(input, {
        target: { value: inputValue },
      });
    });

    const button = screen.getByRole("button", { name: /invite/i });

    await act(() => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderInviteOrganisationComponent());
  });
});
