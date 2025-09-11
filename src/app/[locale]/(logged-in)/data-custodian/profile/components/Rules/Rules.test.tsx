import { render, screen, waitFor } from "@/utils/testUtils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockedCustodian } from "@/mocks/data/custodian";
import { EntityModelTypes } from "@/consts/custodian";
import { mockUseStore } from "jest.setup";
import Rules from "./Rules";

jest.mock("@tanstack/react-query");
jest.mock("@/data/store", () => ({
  useStore: jest.fn(() => ({})),
}));

describe("<Rules />", () => {
  beforeEach(() => {
    mockUseStore({
      custodian: mockedCustodian({
        id: 1,
      }),
    });
  });

  const mockUserRulesData = {
    data: [
      { id: 1, name: "User Rule 1", description: "Description 1" },
      { id: 2, name: "User Rule 2", description: "Description 2" },
    ],
  };

  const mockOrgRulesData = {
    data: [
      { id: 1, name: "Org Rule 1", description: "Org Description 1" },
      { id: 2, name: "Org Rule 2", description: "Org Description 2" },
    ],
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation(queryConfig => {
      const { queryKey } = queryConfig;

      if (queryKey[2] === EntityModelTypes.USER_VALIDATION_RULES) {
        return {
          data: mockUserRulesData,
          isLoading: false,
        };
      }
      if (queryKey[2] === EntityModelTypes.ORG_VALIDATION_RULES) {
        return {
          data: mockOrgRulesData,
          isLoading: false,
        };
      }
      return {};
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      isError: false,
    });
  });

  it("renders the Rules component", async () => {
    render(<Rules />);

    await waitFor(() => {
      expect(screen.getAllByText(/automated flags/i)[0]).toBeInTheDocument();
    });
  });

  it("displays existing rules", async () => {
    render(<Rules />);

    await waitFor(() => {
      expect(screen.getByText(/user rule 1/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/user rule 2/i)).toBeInTheDocument();
    expect(screen.getByText(/org rule 1/i)).toBeInTheDocument();
    expect(screen.getByText(/org rule 2/i)).toBeInTheDocument();
  });

  it("handles loading state", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { container } = render(<Rules />);

    await waitFor(() => {
      expect(
        container.querySelectorAll(".MuiSkeleton-root").length
      ).toBeGreaterThan(0);
    });
  });
});
