import { faker } from "@faker-js/faker";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import InviteUser from "./InviteUser";

jest.mock("@/data/store");

const mockSubmit = jest.fn();

const fields = [/First name/i, /Last name/i, /Email/i];

const renderInviteUserComponent = () => {
  return render(
    <InviteUser
      organisationId={1}
      onSuccess={mockSubmit}
      enableEmailCheck={false}
    />
  );
};

describe("<InviteUser />", () => {
  it.each(fields)("does not submit when %s is not defined", async fieldName => {
    renderInviteUserComponent();

    const input = screen.getByRole("textbox", { name: fieldName });

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
  });

  it("submits with the correct fields", async () => {
    renderInviteUserComponent();

    fields.forEach(name => {
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

    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderInviteUserComponent());
  });
});
