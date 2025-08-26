import { render, waitFor } from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import { mockUseSearchParams } from "jest.setup";
import ActionLogUpdater from "./ActionLogUpdater";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useMutation: jest.fn(),
  };
});

describe("<ActionLogUpdater />", () => {
  let mockMutateAsync: jest.Mock;

  beforeEach(() => {
    mockMutateAsync = jest.fn().mockResolvedValue({});

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    mockUseSearchParams.get.mockReset();
  });

  it("calls mutateAsync and updates router when markActionComplete param is valid", async () => {
    mockUseSearchParams.get.mockReturnValue("123");
    render(<ActionLogUpdater />);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(123);
    });
  });

  it("does not call mutateAsync if markActionComplete param is invalid", async () => {
    mockUseSearchParams.get.mockReturnValue("test");
    render(<ActionLogUpdater />);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });

  it("does nothing if markActionComplete param is missing", async () => {
    render(<ActionLogUpdater />);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });
});
