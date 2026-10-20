import downloadFile from "@/app/actions/files/downloadFile";
import getFile from "@/app/actions/files/getFile";
import postFile from "@/app/actions/files/postFile";
import { FileStatus } from "@/consts/files";
import { mockedSroDeclarationFile } from "@/mocks/data/file";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { File } from "@/types/application";
import { downloadBlob } from "@/utils/file";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { mockUseStore } from "jest.setup";
import SroDeclaration from "./SroDeclaration";

jest.mock("@/app/actions/files/downloadFile");
jest.mock("@/app/actions/files/getFile");
jest.mock("@/app/actions/files/postFile");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

const DOWNLOAD_ERROR = /error occurred while downloading the SRO declaration/i;

const renderWithFiles = (files: File[]) => {
  mockUseStore({
    config: {
      organisation: mockedOrganisation({ files }),
    },
  });

  (getFile as jest.Mock).mockImplementation((id: number) =>
    Promise.resolve({ data: files.find(file => file.id === id) })
  );

  return render(<SroDeclaration isDelegate={false} />);
};

const findDownloadLink = (name: string) =>
  screen.findByRole("button", { name: new RegExp(name) });

describe("<SroDeclaration />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe("when the latest declaration has been processed", () => {
    const file = mockedSroDeclarationFile({
      id: 1,
      name: "declaration.pdf",
      status: FileStatus.PROCESSED,
    });

    it("downloads the file when its name is clicked", async () => {
      const blob = new Blob(["declaration"]);
      (downloadFile as jest.Mock).mockResolvedValue({
        blob,
        fileName: "declaration.pdf",
        contentType: "application/pdf",
      });

      renderWithFiles([file]);

      fireEvent.click(await findDownloadLink("declaration.pdf"));

      await waitFor(() => {
        expect(downloadBlob).toHaveBeenCalledWith(blob, "declaration.pdf");
      });
      expect(downloadFile).toHaveBeenCalledWith(1);
    });

    it("shows an error when the download fails", async () => {
      (downloadFile as jest.Mock).mockRejectedValue(new Error());

      renderWithFiles([file]);

      fireEvent.click(await findDownloadLink("declaration.pdf"));

      expect(await screen.findByText(DOWNLOAD_ERROR)).toBeInTheDocument();
      expect(downloadBlob).not.toHaveBeenCalled();
    });
  });

  describe("when the latest declaration is still being scanned", () => {
    it("shows the file but does not allow it to be downloaded", async () => {
      renderWithFiles([
        mockedSroDeclarationFile({
          id: 1,
          name: "older.pdf",
          status: FileStatus.PROCESSED,
          created_at: "2026-01-01T00:00:00Z",
        }),
        mockedSroDeclarationFile({
          id: 2,
          name: "newer.pdf",
          status: FileStatus.PENDING,
          created_at: "2026-02-01T00:00:00Z",
        }),
      ]);

      const link = await findDownloadLink("newer.pdf");

      expect(link).toBeDisabled();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      fireEvent.click(link);

      expect(downloadFile).not.toHaveBeenCalled();
    });
  });

  describe("when the latest declaration failed its scan", () => {
    it("shows the failed file but does not allow it to be downloaded", async () => {
      renderWithFiles([
        mockedSroDeclarationFile({
          id: 1,
          name: "older.pdf",
          status: FileStatus.PROCESSED,
          created_at: "2026-01-01T00:00:00Z",
        }),
        mockedSroDeclarationFile({
          id: 2,
          name: "newer.pdf",
          status: FileStatus.FAILED,
          created_at: "2026-02-01T00:00:00Z",
        }),
      ]);

      const link = await findDownloadLink("newer.pdf");

      expect(link).toBeDisabled();
      expect(screen.getByTestId("GppBadIcon")).toBeInTheDocument();
      expect(screen.queryByText("older.pdf")).not.toBeInTheDocument();
    });
  });

  describe("when a declaration is uploaded", () => {
    it("allows the file to be downloaded once it has been processed", async () => {
      jest.useFakeTimers();

      const pendingFile = mockedSroDeclarationFile({
        id: 3,
        name: "uploaded.pdf",
        status: FileStatus.PENDING,
      });

      renderWithFiles([]);

      (postFile as jest.Mock).mockResolvedValue({ data: pendingFile });
      (getFile as jest.Mock)
        .mockResolvedValueOnce({ data: pendingFile })
        .mockResolvedValue({
          data: { ...pendingFile, status: FileStatus.PROCESSED },
        });

      fireEvent.change(screen.getByLabelText("File input"), {
        target: {
          files: [
            new window.File(["declaration"], "uploaded.pdf", {
              type: "application/pdf",
            }),
          ],
        },
      });

      fireEvent.click(await screen.findByRole("button", { name: "Close" }));

      expect(await findDownloadLink("uploaded.pdf")).toBeDisabled();

      await act(() => jest.advanceTimersByTimeAsync(2000));

      await waitFor(async () => {
        expect(await findDownloadLink("uploaded.pdf")).toBeEnabled();
      });
    });
  });
});
