import useRemoveSearchParam from "@/hooks/useRemoveSearchParam/useRemoveSearchParam";
import { renderHook } from "@/utils/testUtils";
import { mockUseSearchParams } from "jest.setup";

const setUrl = (url: string) => {
  window.history.replaceState(null, "", url);
  const params = new URLSearchParams(window.location.search);
  mockUseSearchParams.has.mockImplementation((name: string) =>
    params.has(name)
  );
};

describe("useRemoveSearchParam", () => {
  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("removes the parameter and keeps the rest of the URL", () => {
    setUrl("/en/add-affiliation?verify=abc&tab=1#top");

    renderHook(() => useRemoveSearchParam("verify"));

    expect(window.location.pathname).toBe("/en/add-affiliation");
    expect(window.location.search).toBe("?tab=1");
    expect(window.location.hash).toBe("#top");
  });

  it("leaves the URL alone when the parameter isn't there", () => {
    setUrl("/en/add-affiliation?tab=1");
    const replaceState = jest.spyOn(window.history, "replaceState");

    renderHook(() => useRemoveSearchParam("verify"));

    expect(replaceState).not.toHaveBeenCalled();
    replaceState.mockRestore();
  });
});
