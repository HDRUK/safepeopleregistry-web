import { getRequest } from "@/services/requests";
import downloadFile from "@/app/actions/files/downloadFile";

jest.mock("@/services/requests");

describe("downloadFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should download and process the file response", async () => {
    const mockBlob = new Blob(["Hello world"], {
      type: "text/plain",
    });

    const mockResponse = {
      ok: true,
      blob: jest.fn().mockResolvedValue(mockBlob),
      headers: new Headers({
        "Content-Type": "text/plain",
        "Content-Disposition": 'attachment; filename="mockfile.txt"',
      }),
    };

    (getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await downloadFile(1);

    expect(getRequest).toHaveBeenCalledWith("/files/1/download");

    expect(mockResponse.blob).toHaveBeenCalled();
    expect(result).toEqual({
      blob: mockBlob,
      fileName: "mockfile.txt",
      contentType: "text/plain",
    });
  });
});
