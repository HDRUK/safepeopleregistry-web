import { mockedFile } from "@/mocks/data/file";
import { faker } from "@faker-js/faker";
import { FileStatus } from "../consts/files";
import {
  getFileNameFromContentDisposition,
  getLatestCV,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
} from "./file";

describe("File utils", () => {
  it("getLatestCV", () => {
    const name = faker.system.fileName();

    const file = getLatestCV([
      mockedFile(),
      mockedFile({
        name,
      }),
    ]);

    expect(file?.name).toEqual(name);
  });

  it("isFileScanning", () => {
    const result = isFileScanning(
      mockedFile({
        status: FileStatus.PENDING,
      })
    );

    expect(result).toEqual(true);
  });

  it("isFileScanFailed", () => {
    const result = isFileScanFailed(
      mockedFile({
        status: FileStatus.FAILED,
      })
    );

    expect(result).toEqual(true);
  });

  it("isFileScanComplete", () => {
    const result = isFileScanComplete(
      mockedFile({
        status: FileStatus.PROCESSED,
      })
    );

    expect(result).toEqual(true);
  });

  // Header formats are those Laravel's Storage::download produces.
  describe("getFileNameFromContentDisposition", () => {
    it("returns a plain filename", () => {
      expect(
        getFileNameFromContentDisposition(
          "attachment; filename=declaration.pdf"
        )
      ).toEqual("declaration.pdf");
    });

    it("returns a quoted filename without its quotes", () => {
      expect(
        getFileNameFromContentDisposition(
          'attachment; filename="SRO declaration.pdf"'
        )
      ).toEqual("SRO declaration.pdf");
    });

    it("unescapes quotes and backslashes in a quoted filename", () => {
      expect(
        getFileNameFromContentDisposition(
          'attachment; filename="the \\"final\\" copy\\\\v2.pdf"'
        )
      ).toEqual('the "final" copy\\v2.pdf');
    });

    it("prefers the encoded filename for names that are not ASCII", () => {
      expect(
        getFileNameFromContentDisposition(
          "attachment; filename=Declaracion.pdf; filename*=utf-8''Declaraci%C3%B3n.pdf"
        )
      ).toEqual("Declaración.pdf");
    });

    it("prefers the encoded filename when the fallback is quoted", () => {
      expect(
        getFileNameFromContentDisposition(
          "attachment; filename=\"SRO Declaracion.pdf\"; filename*=utf-8''SRO%20Declaraci%C3%B3n.pdf"
        )
      ).toEqual("SRO Declaración.pdf");
    });

    it("falls back to the plain filename when the encoded one is malformed", () => {
      expect(
        getFileNameFromContentDisposition(
          "attachment; filename=Declaracion.pdf; filename*=utf-8''Declaraci%E0%A4n.pdf"
        )
      ).toEqual("Declaracion.pdf");
    });

    it("returns undefined when there is no filename", () => {
      expect(getFileNameFromContentDisposition(null)).toBeUndefined();
      expect(getFileNameFromContentDisposition("attachment")).toBeUndefined();
    });
  });
});
