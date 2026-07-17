import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { ROUTES } from "@/consts/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { mockedUser } from "@/mocks/data/user";
import Trainings from "./Trainings";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

describe("Trainings", () => {
  const mockUser = mockedUser({ id: 1 });

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({ user: mockUser });
    (useQuery as jest.Mock).mockReturnValue({
      // data: mockUserData,
      isLoading: false,
      refetch: jest.fn(),
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders without crashing", () => {
    render(<Trainings />);
    expect(
      screen.getByText("Complete your training and membership history")
    ).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const mockPutUser = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockPutUser,
      isPending: false,
    });

    render(<Trainings />);

    await act(async () => {
      fireEvent.click(screen.getByText("Finish"));
    });
  });

  it("navigates to the correct route after submission", async () => {
    render(<Trainings />);

    await act(async () => {
      fireEvent.click(screen.getByText("Finish"));
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        ROUTES.profileResearcherHome.path
      );
    });
  });

  it("updates form when user data changes", async () => {
    const { rerender } = render(<Trainings />);

    rerender(<Trainings />);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Trainings />));
  });
});
