import { filterDuplicates } from "./dnd";

describe("Dnd utils", () => {
  describe("filterDuplicates", () => {
    it("filters duplicate items out", async () => {
      expect(
        filterDuplicates({
          pending: [
            {
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 2,
            },
          ],
        })
      ).toEqual({
        pending: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      });
    });
  });
});
