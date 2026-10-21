import downloadFile from "@/app/actions/files/downloadFile";
import getFile from "@/app/actions/files/getFile";
import postFile from "@/app/actions/files/postFile";
import getOrganisation from "@/app/actions/organisations/getOrganisation";
import getOrganisationSroDeclarationDetails from "@/app/actions/organisations/getOrganisationSroDeclarationDetails";
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
jest.mock("@/app/actions/organisations/getOrganisationSroDeclarationDetails");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

const DOWNLOAD_ERROR = /error occurred while downloading the SRO declaration/i;
const ORGANISATION_ID = 1;
const SCAN_POLL_INTERVAL_MS = 2000;

// The API hides an organisation's files, so the latest declaration comes
// from its own endpoint.
const renderWithDeclaration = (latest: File | null) => {
  const organisation = mockedOrganisation({
    id: ORGANISATION_ID,
    files: undefined,
  });

  // The real setter freezes the store, which mockUseStore then can't mutate.
  mockUseStore({
    config: {
      organisation,
    },
    setOrganisation: jest.fn(),
  });

  (getOrganisation as jest.Mock).mockResolvedValue({ data: organisation });
  (getOrganisationSroDeclarationDetails as jest.Mock).mockResolvedValue({
    data: latest,
  });
  (getFile as jest.Mock).mockImplementation((id: number) =>
    Promise.resolve({ data: id === latest?.id ? latest : undefined })
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

const expectReloaded = async () => {
  await waitFor(() => {
    expect(getOrganisation).toHaveBeenCalledWith(
      ORGANISATION_ID,
      expect.anything()
    );
    expect(getOrganisationSroDeclarationDetails).toHaveBeenCalledWith(
      ORGANISATION_ID,
      expect.anything()
    );
  });
};

const waitForFirstLoad = async () => {
  await waitFor(() => {
    expect(getOrganisation).toHaveBeenCalled();
    expect(getOrganisationSroDeclarationDetails).toHaveBeenCalled();
  });
  (getOrganisation as jest.Mock).mockClear();
  (getOrganisationSroDeclarationDetails as jest.Mock).mockClear();
};

const finishScan = () =>
  act(() => jest.advanceTimersByTimeAsync(SCAN_POLL_INTERVAL_MS));

describe("<SroDeclaration />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("shows a previously uploaded declaration after the page is reloaded", async () => {
    renderWithDeclaration(
      mockedSroDeclarationFile({
        id: 1,
        name: "uploaded-earlier.pdf",
        status: FileStatus.PROCESSED,
      })
    );

    expect(await findDownloadLink("uploaded-earlier.pdf")).toBeEnabled();
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

      renderWithDeclaration(file);

      fireEvent.click(await findDownloadLink("declaration.pdf"));

      await waitFor(() => {
        expect(downloadBlob).toHaveBeenCalledWith(blob, "declaration.pdf");
      });
      expect(downloadFile).toHaveBeenCalledWith(1);
    });

    it("shows an error when the download fails", async () => {
      (downloadFile as jest.Mock).mockRejectedValue(new Error());

      renderWithDeclaration(file);

      fireEvent.click(await findDownloadLink("declaration.pdf"));

      expect(await screen.findByText(DOWNLOAD_ERROR)).toBeInTheDocument();
      expect(downloadBlob).not.toHaveBeenCalled();
    });
  });

  describe("when the latest declaration is still being scanned", () => {
    it("shows the file but does not allow it to be downloaded", async () => {
      renderWithDeclaration(
        mockedSroDeclarationFile({
          id: 2,
          name: "scanning.pdf",
          status: FileStatus.PENDING,
        })
      );

      const link = await findDownloadLink("scanning.pdf");

      expect(link).toBeDisabled();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      fireEvent.click(link);

      expect(downloadFile).not.toHaveBeenCalled();
    });
  });

  describe("when the latest declaration failed its scan", () => {
    it("shows the failed file but does not allow it to be downloaded", async () => {
      renderWithDeclaration(
        mockedSroDeclarationFile({
          id: 2,
          name: "failed.pdf",
          status: FileStatus.FAILED,
        })
      );

      const link = await findDownloadLink("failed.pdf");

      expect(link).toBeDisabled();
      expect(screen.getByTestId("GppBadIcon")).toBeInTheDocument();
    });
  });

  describe("when a declaration is uploaded", () => {
    it("allows the file to be downloaded once it has been processed", async () => {
      jest.useFakeTimers();

      renderWithDeclaration(null);

      await uploadDeclaration(FileStatus.PROCESSED);

      expect(await findDownloadLink("uploaded.pdf")).toBeDisabled();

      await finishScan();

      await waitFor(async () => {
        expect(await findDownloadLink("uploaded.pdf")).toBeEnabled();
      });
    });

    it("reloads the organisation and its declaration details once the declaration has been uploaded", async () => {
      jest.useFakeTimers();
      renderWithDeclaration(null);
      await waitForFirstLoad();

      await uploadDeclaration(FileStatus.PROCESSED);

      await expectReloaded();
    });

    it.each([FileStatus.PROCESSED, FileStatus.FAILED])(
      "reloads the organisation and its declaration details again once the scan has finished as %s",
      async scannedStatus => {
        jest.useFakeTimers();
        renderWithDeclaration(null);
        await uploadDeclaration(scannedStatus);
        await waitForFirstLoad();

        await finishScan();

        await expectReloaded();
      }
    );

    it("does not reload the organisation or its declaration details while the scan is still running", async () => {
      jest.useFakeTimers();
      renderWithDeclaration(null);
      await uploadDeclaration(FileStatus.PENDING);
      await waitForFirstLoad();

      await finishScan();

      expect(getOrganisation).not.toHaveBeenCalled();
      expect(getOrganisationSroDeclarationDetails).not.toHaveBeenCalled();
    });
  });
});
