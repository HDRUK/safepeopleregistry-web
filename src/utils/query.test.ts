import {
  createQuery,
  createMutation,
  isQueriesError,
  isQueriesFetched,
  isQueriesLoading,
  responseToQueryState,
} from "./query";
import { waitFor } from "./testUtils";

describe("isQueriesFetched", () => {
  it("returns true when all queries are complete", async () => {
    const results = isQueriesFetched([
      {
        isFetched: true,
      },
      {
        isFetched: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns true when any query is incomplete", async () => {
    const results = isQueriesFetched([
      {
        isFetched: false,
      },
      {
        isFetched: true,
      },
    ]);

    expect(results).toEqual(false);
  });
});

describe("responseToQueryState", () => {
  it("returns the correct query state on error", () => {
    const results = responseToQueryState({
      ok: false,
      data: "data",
    });

    expect(results).toEqual({
      isSuccess: false,
      isError: true,
      data: "data",
    });
  });

  it("returns the correct query state on error", () => {
    const results = responseToQueryState({
      ok: true,
      data: "data",
    });

    expect(results).toEqual({
      isSuccess: true,
      isError: false,
      data: "data",
    });
  });
});

describe("isQueriesLoading", () => {
  it("returns true when any query is running", async () => {
    const results = isQueriesLoading([
      {
        isLoading: false,
      },
      {
        isLoading: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns false when no query is running", async () => {
    const results = isQueriesLoading([
      {
        isLoading: false,
      },
      {
        isFetched: false,
      },
    ]);

    expect(results).toEqual(false);
  });
});

describe("isQueriesError", () => {
  it("returns true when any query has an error", async () => {
    const results = isQueriesError([
      {
        isError: false,
      },
      {
        isError: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns false when no query has an error", async () => {
    const results = isQueriesError([
      {
        isError: false,
      },
      {
        isError: false,
      },
    ]);

    expect(results).toEqual(false);
  });
});

describe("createQuery", () => {
  it("returns a react query useQuery config object", async () => {
    const mockQueryFn = jest.fn().mockResolvedValue([]);

    const results = createQuery(
      {
        queryKey: ["getQuery"],
        queryFn: mockQueryFn,
      },
      {
        queryKeySuffix: ["test"],
      }
    );

    expect(results).toEqual(
      expect.objectContaining({
        queryKey: ["getQuery", "test"],
        queryFn: expect.any(Function),
      })
    );

    results.queryFn(1);

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledWith(1, {
        error: { message: "getQueryError" },
      });
    });
  });
});

describe("createMutation", () => {
  it("returns a react query useMutation config object", async () => {
    const mockMutationFn = jest.fn().mockResolvedValue([]);
    const mutationArgs = { params: { id: 1 }, payload: { name: "Test" } };

    const results = createMutation(
      {
        mutationKey: ["putMutation"],
        mutationFn: mockMutationFn,
      },
      {
        queryKeySuffix: ["test"],
      }
    );

    expect(results).toEqual(
      expect.objectContaining({
        mutationKey: ["putMutation", "test"],
        mutationFn: expect.any(Function),
      })
    );

    results.mutationFn(mutationArgs);

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledWith(mutationArgs, {
        error: { message: "putMutationError" },
      });
    });
  });
});
