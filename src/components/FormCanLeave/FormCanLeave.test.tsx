import { useFormState } from "react-hook-form";
import Link from "next/link";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import FormCanLeave from ".";

const renderFormCanLeave = () => {
  render(
    <FormCanLeave>
      <Link href="/">Link</Link>
    </FormCanLeave>
  );
};

const renderLinkClicked = () => {
  const rendered = renderFormCanLeave();

  const link = screen.getByRole("link");

  fireEvent.click(link);
  link.focus();

  return rendered;
};

jest.mock("react-hook-form", () => ({
  useFormState: jest.fn(),
  useWatch: jest.fn(),
}));

describe("<FormCanLeave />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("doesn't show the warning", async () => {
    (useFormState as jest.Mock).mockReturnValue({ dirtyFields: {} });

    renderLinkClicked();

    expect(
      screen.queryByText(/You have unsaved changes/i)
    ).not.toBeInTheDocument();
  });

  it("shows the warning", async () => {
    (useFormState as jest.Mock).mockReturnValue({
      dirtyFields: {
        field: "value",
      },
    });

    renderLinkClicked();

    await waitFor(() => {
      expect(screen.getByText(/You have unsaved changes/i)).toBeInTheDocument();
    });
  });
});
