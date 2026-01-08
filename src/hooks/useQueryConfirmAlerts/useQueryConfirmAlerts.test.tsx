import { MutationState, QueryState } from "@/types/form";
import { useEffect } from "react";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import useQueryConfirmAlerts from "./useQueryConfirmAlerts";

const TestComponent = (queryState: QueryState | MutationState) => {
  const showConfirm = useQueryConfirmAlerts(queryState);

  useEffect(() => {
    showConfirm(null);
  }, []);

  return null;
};

describe("useQueryConfirmAlerts", () => {
  it("show the delete alert", async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(/Delete/)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /Are you sure you want to delete this data\? This action may be permanent./
      )
    ).toBeInTheDocument();
  });

  it("show the error alert", async () => {
    render(<TestComponent isError />);

    const deleteButton = screen.getByRole("button", {
      name: /Delete/,
    });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});
