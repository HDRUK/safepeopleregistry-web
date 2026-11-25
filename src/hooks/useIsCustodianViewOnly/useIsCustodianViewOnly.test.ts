import { useStore } from "@/data/store";
import { renderHook } from "@/utils/testUtils";
import useIsCustodianViewOnly from "./useIsCustodianViewOnly";

jest.mock("@/data/store");

const mockStore = (isCustodianViewOnly?: boolean) => {
  (useStore as unknown as jest.Mock).mockImplementation(selector =>
    selector({ config: { isCustodianViewOnly } })
  );
};

describe("useIsCustodianViewOnly", () => {
  it("returns true for a viewer", () => {
    mockStore(true);

    const { result } = renderHook(() => useIsCustodianViewOnly());

    expect(result.current).toBe(true);
  });

  it("returns false for other custodians", () => {
    mockStore(false);

    const { result } = renderHook(() => useIsCustodianViewOnly());

    expect(result.current).toBe(false);
  });

  it("returns false before the role is known", () => {
    mockStore(undefined);

    const { result } = renderHook(() => useIsCustodianViewOnly());

    expect(result.current).toBe(false);
  });
});
