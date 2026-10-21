import { getRequest } from "@/services/requests";
import getOrganisationSroDeclaration from "./getOrganisationSroDeclaration";

jest.mock("@/services/requests");

const mockDownloadResponse = (contentDisposition: string) => {
  const blob = new Blob(["declaration"], { type: "application/pdf" });

  (getRequest as jest.Mock).mockResolvedValue({
    ok: true,
    blob: jest.fn().mockResolvedValue(blob),
    headers: new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition,
    }),
  });

  return blob;
};

describe("getOrganisationSroDeclaration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("downloads the organisation's SRO declaration", async () => {
    const blob = mockDownloadResponse(
      'attachment; filename="SRO declaration.pdf"'
    );

    const result = await getOrganisationSroDeclaration(1);

    expect(getRequest).toHaveBeenCalledWith("/organisations/1/sro_declaration");
    expect(result).toEqual({
      blob,
      fileName: "SRO declaration.pdf",
      contentType: "application/pdf",
    });
  });

  it("uses the encoded filename for names that are not ASCII", async () => {
    mockDownloadResponse(
      "attachment; filename=Declaracion.pdf; filename*=utf-8''Declaraci%C3%B3n.pdf"
    );

    const { fileName } = await getOrganisationSroDeclaration(1);

    expect(fileName).toEqual("Declaración.pdf");
  });
});
