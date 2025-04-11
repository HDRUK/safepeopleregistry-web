import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import UserIdentity from "./UserIdentity";

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

describe("<UserIdentity />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the identity page", async () => {
    mockUseStore({
      config: {
        user: { id: 123 },
      },
      current: {
        user: {
          registry_id: 123,
          first_name: "James",
          last_name: "Dean",
          registry: {
            identity: {
              idvt_completed_at: "04-04-2025T09:00:00",
              idvt_result: 1,
            },
          },
          location: "London, UK",
        },
      },
    });
    render(<UserIdentity />);
    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
  });

  it("displays the location when supplied", async () => {
    mockUseStore({
      current: {
        user: {
          location: "London, UK",
        },
      },
    });
    render(<UserIdentity />);
    await waitFor(() => {
      expect(screen.getByText("London, UK")).toBeInTheDocument();
    });
  });

  it("displays a placeholder when the location is not supplied", async () => {
    mockUseStore({
      current: {
        user: {
          registry: {
            identity: {
              idvt_completed_at: "04-04-2025T09:00:02",
              idvt_result: 1,
            },
          },
        },
      },
    });
    render(<UserIdentity />);
    await waitFor(() => {
      expect(screen.queryByText("London, UK")).not.toBeInTheDocument();
      expect(screen.getByText("Location not provided")).toBeInTheDocument();
    });
  });

  it("displays correctly when idvt checks complete", async () => {
    mockUseStore({
      current: {
        user: {
          registry: {
            identity: {
              idvt_completed_at: "04-04-2025T09:00:03",
              idvt_result: 1,
            },
          },
        },
      },
    });
    render(<UserIdentity />);
    await waitFor(() => {
      expect(screen.getByText("IDVT checks complete")).toBeInTheDocument();
    });
  });

  it.each([
    {
      idvt_completed_at: null,
      idvt_result: 1,
    },
    {
      idvt_completed_at: "04-04-2025T09:00:04",
      idvt_result: 0,
    },
    {
      idvt_completed_at: "04-04-2025T09:00:05",
      idvt_result: null,
    },
    {
      idvt_completed_at: null,
      idvt_result: null,
    },
  ])("displays correctly when idvt checks not complete", async identity => {
    mockUseStore({
      current: {
        user: {
          registry: {
            identity,
          },
        },
      },
    });
    render(<UserIdentity />);
    await waitFor(() => {
      expect(screen.getByText("IDVT checks incomplete")).toBeInTheDocument();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<UserIdentity />));
  });
});
