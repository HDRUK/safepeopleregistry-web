import useCustodianViewerAccess from "@/hooks/useCustodianViewerAccess";
import { renderHook } from "@/utils/testUtils";
import useIsCustodianViewOnly from "./useIsCustodianViewOnly";

jest.mock("@/hooks/useCustodianViewerAccess");

const mockAccess = (isViewOnly: boolean) => {
  (useCustodianViewerAccess as jest.Mock).mockReturnValue({
    isLoading: false,
    isViewer: true,
    isViewOnly,
    isViewerDisabled: !isViewOnly,
  });
};

describe("useIsCustodianViewOnly", () => {
  it("returns true for a viewer when the flag is on", () => {
    mockAccess(true);

    const { result } = renderHook(() => useIsCustodianViewOnly());

    expect(result.current).toBe(true);
  });

  it("returns false for a viewer when the flag is off", () => {
    mockAccess(false);

    const { result } = renderHook(() => useIsCustodianViewOnly());

    expect(result.current).toBe(false);
  });
});
