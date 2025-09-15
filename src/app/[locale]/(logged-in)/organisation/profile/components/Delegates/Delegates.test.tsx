import { useQuery, useMutation } from "@tanstack/react-query";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockUseStore } from "jest.setup";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";
import Delegates from "./Delegates";

jest.mock("@/data/store");

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

const mockSetOrganisation = jest.fn();

jest.mock("../../hooks/useUpdateOrganisation");

const mockOrganisation = mockedOrganisation();
const mockUser = mockedUser();
const mockDelegates = [
  mockedUser({
    is_delegate: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    created_at: "2023-01-01T00:00:00Z",
  }),
  mockedUser({
    is_delegate: 1,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    created_at: "2023-02-01T00:00:00Z",
  }),
];

describe("<Delegates />", () => {
  beforeEach(() => {
    mockUseStore({
      getUser: () => mockUser,
      getOrganisation: () => mockOrganisation,
      setOrganisation: mockSetOrganisation,
    });

    (useQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: { data: mockDelegates },
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ success: true }),
      isPending: false,
    });

    (useUpdateOrganisation as jest.Mock).mockReturnValue({
      isError: false,
      isPending: false,
      error: null,
      onSubmit: jest.fn(),
    });
  });

  it("displays delegate information correctly", async () => {
    render(<Delegates />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("01/01/2023")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("01/02/2023")).toBeInTheDocument();
    });
  });

  // it("shows loading state", () => {
  //   (useQuery as jest.Mock).mockReturnValue({
  //     isError: false,
  //     isLoading: true,
  //     data: undefined,
  //   });

  //   render(<Delegates />);
  //   expect(screen.getByRole("progressbar")).toBeInTheDocument();
  // });

  // it("shows error state", () => {
  //   (useQuery as jest.Mock).mockReturnValue({
  //     isError: true,
  //     isLoading: false,
  //     data: null,
  //   });

  //   render(<Delegates />);
  //   expect(
  //     screen.getByText(
  //       content =>
  //         content.includes("Unable to get the list of Delegates") &&
  //         content.includes("Please try again or contact us")
  //     )
  //   ).toBeInTheDocument();
  // });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Delegates />));
  });
});
