import { SearchDirections } from "@/consts/search";
import { renderHook } from "@/utils/testUtils";
import useSort from "./useSort";

type Item = Parameters<typeof useSort>[0]["items"][number];

const setupUseSort = (item: Partial<Item>, sort?: string) =>
  renderHook(() =>
    useSort({
      items: [{ label: "Field", key: "field", ...item }],
      queryParams: sort ? { sort } : {},
      onSort: jest.fn(),
    })
  );

const getLabel = (item: Partial<Item>, sort?: string) =>
  setupUseSort(item, sort).result.current.actions[0].label;

describe("useSort", () => {
  it.each([
    [{}, undefined, "Field (A-Z)"],
    [{}, "field:asc", "Field (Z-A)"],
    [{ type: "number" as const }, undefined, "Field (0-9)"],
    [{ type: "number" as const }, "field:asc", "Field (9-0)"],
    [{ type: "date" as const }, undefined, "Field (Oldest first)"],
    [{ type: "date" as const }, "field:asc", "Field (Newest first)"],
    [
      { type: "date" as const, sortDirection: SearchDirections.DESC },
      undefined,
      "Field (Newest first)",
    ],
    [
      { type: "date" as const, sortDirection: SearchDirections.DESC },
      "field:desc",
      "Field (Oldest first)",
    ],
  ])("labels %p with sort %p as %p", (item, sort, expected) => {
    expect(getLabel(item, sort)).toBe(expected);
  });
});
