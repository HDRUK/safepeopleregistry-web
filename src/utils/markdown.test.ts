import { getLinkAction } from "./markdown";

const mockClick = jest.fn();

describe("getLinkAction", () => {
  it("opens cookie preferences", () => {
    jest.spyOn(document, "getElementById").mockImplementation(
      () =>
        ({
          click: mockClick,
        }) as unknown as HTMLElement
    );

    const result = getLinkAction("#button-cookie-edit-preferences");

    result?.();

    expect(mockClick).toHaveBeenCalled();
  });
});
