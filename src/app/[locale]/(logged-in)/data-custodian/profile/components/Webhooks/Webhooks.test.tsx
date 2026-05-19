import { render, screen, waitFor } from "@/utils/testUtils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockedCustodian } from "@/mocks/data/custodian";
import Webhooks from "./Webhooks";
import useIsCustodianAdmin from "@/hooks/useIsCustodianAdmin";

// Mock the dependencies
jest.mock("@tanstack/react-query");
jest.mock("@/data/store", () => ({
  useStore: jest.fn(() => ({
    config: {
      custodian: mockedCustodian({ id: 1 }),
    },
  })),
}));
jest.mock("@/hooks/useIsCustodianAdmin");

describe("<Webhooks />", () => {
  const mockWebhooksData = {
    data: [
      {
        id: 1,
        url: "https://example.com/webhook1",
        webhook_event: 1,
        event_trigger: {
          id: 1,
          name: "user-left-project",
          description: "",
        },
      },
      {
        id: 2,
        url: "https://example.com/webhook2",
        webhook_event: 2,
        event_trigger: {
          id: 2,
          name: "user-left-project",
          description: "",
        },
      },
    ],
  };

  const mockEventTriggers = {
    data: [
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ],
  };

  beforeEach(() => {
    (useIsCustodianAdmin as jest.Mock).mockReturnValue(true);

    (useQuery as jest.Mock).mockImplementation(queryConfig => {
      if (
        typeof queryConfig === "object" &&
        queryConfig !== null &&
        Array.isArray(queryConfig.queryKey)
      ) {
        const queryKey = queryConfig.queryKey[0];

        if (queryKey === "getCustodianWebhooks") {
          return {
            data: mockWebhooksData,
            isLoading: false,
            refetch: jest.fn(),
          };
        }
        if (queryKey === "getWebhookEventTrigger") {
          return { data: mockEventTriggers };
        }
      }
      return {};
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
  });

  it("renders the Webhooks component", async () => {
    render(<Webhooks />);

    await waitFor(() => {
      expect(screen.getByText("Webhooks")).toBeInTheDocument();
    });
  });

  it("displays existing webhooks", async () => {
    render(<Webhooks />);

    await waitFor(() => {
      expect(
        screen.getByDisplayValue("https://example.com/webhook1")
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("https://example.com/webhook2")
      ).toBeInTheDocument();
    });
  });

  it("allows adding a new webhook", async () => {
    render(<Webhooks />);

    await waitFor(() => {
      const addButton = screen.getByRole("button", { name: /add another/i });
      addButton.click();
    });

    expect(screen.getAllByRole("textbox").length).toBe(3);
  });
});
