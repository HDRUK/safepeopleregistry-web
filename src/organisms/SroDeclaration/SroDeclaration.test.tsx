import downloadFile from "@/app/actions/files/downloadFile";
import getFile from "@/app/actions/files/getFile";
import postFile from "@/app/actions/files/postFile";
import getOrganisation from "@/app/actions/organisations/getOrganisation";
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
jest.mock("@/app/actions/organisations/getOrganisation");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

const DOWNLOAD_ERROR = /error occurred while downloading the SRO declaration/i;
const ORGANISATION_ID = 1;
const SCAN_POLL_INTERVAL_MS = 2000;

const renderWithFiles = (files: File[]) => {
  const organisation = mockedOrganisation({ id: ORGANISATION_ID, files });

  mockUseStore({
    config: {
      organisation,
    },
  });

  (getOrganisation as jest.Mock).mockResolvedValue({ data: organisation });
  (getFile as jest.Mock).mockImplementation((id: number) =>
    Promise.resolve({ data: files.find(file => file.id === id) })
  );

  return render(<SroDeclaration isDelegate={false} />);
};

const findDownloadLink = (name: string) =>
  screen.findByRole("button", { name: new RegExp(name) });

const uploadDeclaration = async (scannedStatus: FileStatus) => {
  const pendingFile = mockedSroDeclarationFile({
    id: 3,
    name: "uploaded.pdf",
    status: FileStatus.PENDING,
  });

  (postFile as jest.Mock).mockResolvedValue({ data: pendingFile });
  (getFile as jest.Mock)
    .mockResolvedValueOnce({ data: pendingFile })
    .mockResolvedValue({ data: { ...pendingFile, status: scannedStatus } });

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
};

const finishScan = () =>
  act(() => jest.advanceTimersByTimeAsync(SCAN_POLL_INTERVAL_MS));

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

      renderWithFiles([]);

      await uploadDeclaration(FileStatus.PROCESSED);

      expect(await findDownloadLink("uploaded.pdf")).toBeDisabled();

      await finishScan();

      await waitFor(async () => {
        expect(await findDownloadLink("uploaded.pdf")).toBeEnabled();
      });
    });

    it("reloads the organisation once the declaration has been uploaded", async () => {
      jest.useFakeTimers();
      renderWithFiles([]);
      await waitFor(() => expect(getOrganisation).toHaveBeenCalled());
      (getOrganisation as jest.Mock).mockClear();

      await uploadDeclaration(FileStatus.PROCESSED);

      await waitFor(() => {
        expect(getOrganisation).toHaveBeenCalledWith(
          ORGANISATION_ID,
          expect.anything()
        );
      });
    });

    it.each([FileStatus.PROCESSED, FileStatus.FAILED])(
      "reloads the organisation again once the scan has finished as %s",
      async scannedStatus => {
        jest.useFakeTimers();
        renderWithFiles([]);
        await uploadDeclaration(scannedStatus);
        await waitFor(() => expect(getOrganisation).toHaveBeenCalled());
        (getOrganisation as jest.Mock).mockClear();

        await finishScan();

        await waitFor(() => {
          expect(getOrganisation).toHaveBeenCalledWith(
            ORGANISATION_ID,
            expect.anything()
          );
        });
      }
    );

    it("does not reload the organisation while the scan is still running", async () => {
      jest.useFakeTimers();
      renderWithFiles([]);
      await uploadDeclaration(FileStatus.PENDING);
      await waitFor(() => expect(getOrganisation).toHaveBeenCalled());
      (getOrganisation as jest.Mock).mockClear();

      await finishScan();

      expect(getOrganisation).not.toHaveBeenCalled();
    });
  });
});
