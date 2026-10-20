import { mockedFile, mockedSroDeclarationFile } from "@/mocks/data/file";
import { faker } from "@faker-js/faker";
import { FileStatus, FileType } from "../consts/files";
import {
  getLatestCV,
  getLatestSRODeclaration,
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

  describe("getLatestSRODeclaration", () => {
    const older = mockedSroDeclarationFile({
      id: 1,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-03-01T00:00:00Z",
    });
    const newer = mockedSroDeclarationFile({
      id: 2,
      created_at: "2026-02-01T00:00:00Z",
      updated_at: "2026-02-01T00:00:00Z",
    });

    it("returns the most recently uploaded declaration, whichever order the files are in", () => {
      expect(getLatestSRODeclaration([newer, older])).toEqual(newer);
      expect(getLatestSRODeclaration([older, newer])).toEqual(newer);
    });

    it("returns the most recently uploaded declaration even if an older one was updated later", () => {
      expect(getLatestSRODeclaration([older, newer])?.id).toEqual(2);
    });

    it("returns the higher id when two declarations were uploaded at the same time", () => {
      const sameTime = mockedSroDeclarationFile({
        id: 3,
        created_at: newer.created_at,
      });

      expect(getLatestSRODeclaration([sameTime, newer])?.id).toEqual(3);
      expect(getLatestSRODeclaration([newer, sameTime])?.id).toEqual(3);
    });

    it("ignores files that are not SRO declarations", () => {
      const cv = mockedFile({
        type: FileType.CV,
        created_at: "2026-12-01T00:00:00Z",
      });

      expect(getLatestSRODeclaration([cv, older])).toEqual(older);
    });

    it("returns undefined when there are no declarations", () => {
      expect(getLatestSRODeclaration(undefined)).toBeUndefined();
      expect(
        getLatestSRODeclaration([mockedFile({ type: FileType.CV })])
      ).toBeUndefined();
    });

    it("does not reorder the files it is given", () => {
      const files = [older, newer];

      getLatestSRODeclaration(files);

      expect(files).toEqual([older, newer]);
    });
  });
});
