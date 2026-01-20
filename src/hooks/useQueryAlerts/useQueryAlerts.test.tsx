import { MutationState, QueryState } from "@/types/form";
import { renderHook, screen, waitFor } from "../../utils/testUtils";
import useQueryAlerts, { QueryAlertOptions } from "./useQueryAlerts";

const renderTest = (
  queryState: QueryState | MutationState,
  options?: QueryAlertOptions
) => renderHook(() => useQueryAlerts(queryState, options));

describe("useQueryAlerts", () => {
  it("does not show the error alert", async () => {
    renderTest(
      {
        isSuccess: false,
        isError: true,
      },
      {
        enabled: false,
      }
    );

    await waitFor(() => {
      expect(screen.queryByText(/Error/)).not.toBeInTheDocument();
    });
  });

  it("show the success alert", async () => {
    renderTest({
      isSuccess: true,
      isError: false,
    });

    await waitFor(() => {
      expect(screen.getByText(/Success/)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Your request has been successful/)
    ).toBeInTheDocument();
  });

  it("show the error alert", async () => {
    renderTest({
      isSuccess: false,
      isError: true,
    });

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /There has been a problem with your request. Please try again or contact us at/
      )
    ).toBeInTheDocument();
  });
});
