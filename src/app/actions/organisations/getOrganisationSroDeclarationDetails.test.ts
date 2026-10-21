import { FileStatus, FileType } from "@/consts/files";
import { getRequest } from "@/services/requests";
import { mock200Json, mockFailedJson } from "jest.utils";
import getOrganisationSroDeclarationDetails from "./getOrganisationSroDeclarationDetails";

jest.mock("@/services/requests");

const OPTIONS = { error: { message: "getSroDeclarationDetailsError" } };

describe("getOrganisationSroDeclarationDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the details of the organisation's latest SRO declaration", async () => {
    const details = {
      id: 3,
      name: "declaration.pdf",
      type: FileType.DECLARATION_SRO,
      status: FileStatus.PENDING,
      created_at: "2026-01-01T00:00:00.000000Z",
      updated_at: "2026-01-01T00:00:00.000000Z",
    };
    (getRequest as jest.Mock).mockResolvedValue(mock200Json(details));

    const { data } = await getOrganisationSroDeclarationDetails(1, OPTIONS);

    expect(getRequest).toHaveBeenCalledWith(
      "/organisations/1/sro_declaration/details",
      undefined
    );
    expect(data).toEqual(details);
  });

  it("returns no details when there is no declaration", async () => {
    (getRequest as jest.Mock).mockResolvedValue(mock200Json(null));

    const { data } = await getOrganisationSroDeclarationDetails(1, OPTIONS);

    expect(data).toBeNull();
  });

  it("throws when the details cannot be seen", async () => {
    (getRequest as jest.Mock).mockResolvedValue(mockFailedJson(null, 403));

    await expect(
      getOrganisationSroDeclarationDetails(1, OPTIONS)
    ).rejects.toThrow("getSroDeclarationDetailsError");
  });
});
