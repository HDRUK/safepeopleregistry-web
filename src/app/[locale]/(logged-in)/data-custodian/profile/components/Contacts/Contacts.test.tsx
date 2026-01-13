import { render, screen, fireEvent, within, waitFor } from "@/utils/testUtils";
import Contacts from "./Contacts";

const mockMutateAsync = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn().mockImplementation(() => ({
    mutateAsync: payload => mockMutateAsync(payload),
  })),
}));

const setupShowModal = () => {
  const rendered = render(<Contacts />);

  const addButton = screen.getByRole("button", { name: /add new/i });
  fireEvent.click(addButton);

  return rendered;
};

describe("Contacts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct content", () => {
    render(<Contacts />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add new/i })
    ).toBeInTheDocument();
  });

  it("renders the AdministrativeContacts table", async () => {
    render(<Contacts />);

    const rowGroups = await screen.findAllByRole("rowgroup");

    if (rowGroups) {
      const rows = within(rowGroups[1]).getAllByRole("row");

      await waitFor(() => {
        expect(rows).toHaveLength(2);
      });
    } else {
      fail("Unable to find table");
    }
  });

  it("opens the modal", () => {
    setupShowModal();

    expect(screen.getByTestId("form-modal")).toBeInTheDocument();
  });

  it("closes the UserModal", () => {
    setupShowModal();

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("form-modal")).not.toBeInTheDocument();
  });

  it("deletes the user", async () => {
    render(<Contacts />);

    const rowGroups = await screen.findAllByRole("rowgroup");

    if (rowGroups) {
      const deleteButton = within(rowGroups[1]).getAllByLabelText(
        /delete user/i
      );

      fireEvent.click(deleteButton[0]);

      const confirmDeleteButton = await screen.findByRole("button", {
        name: /delete/i,
      });

      if (confirmDeleteButton) {
        fireEvent.click(confirmDeleteButton);

        await waitFor(() => {
          expect(mockMutateAsync).toHaveBeenCalledWith(1);
        });
      } else {
        fail("Unable to find delete button");
      }
    } else {
      fail("Unable to find table");
    }
  });

  it("edits the user", async () => {
    render(<Contacts />);

    const rowGroups = await screen.findAllByRole("rowgroup");

    if (rowGroups) {
      const editButton = within(rowGroups[1]).getAllByLabelText(/edit user/i);

      fireEvent.click(editButton[0]);

      const saveButton = await screen.findByRole("button", {
        name: /save/i,
      });

      fireEvent.click(saveButton);

      if (saveButton) {
        await waitFor(() => {
          expect(mockMutateAsync).toHaveBeenCalledWith({       
            email: "john.smith@hdruk.ac.uk",
            first_name: "John",
            id: 1,
            last_name: "Smith",
            permissions: [10],
          });
        });
      } else {
        fail("Unable to find save button");
      }
    } else {
      fail("Unable to find table");
    }
  });
});
