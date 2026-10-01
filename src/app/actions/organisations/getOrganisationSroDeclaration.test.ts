import { getRequest } from "@/services/requests";
import getOrganisationSroDeclaration from "./getOrganisationSroDeclaration";

jest.mock("@/services/requests", () => ({
  getRequest: jest.fn(),
}));

describe("getOrganisationSroDeclaration", () => {
  it("calls the correct SRO declaration endpoint and returns the response", async () => {
    const response = { ok: true } as Response;
    (getRequest as jest.Mock).mockResolvedValue(response);

    await expect(getOrganisationSroDeclaration(42)).resolves.toBe(response);
    expect(getRequest).toHaveBeenCalledWith("/organisation/42/sro_declaration");
  });
});
