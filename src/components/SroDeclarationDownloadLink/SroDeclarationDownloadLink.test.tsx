import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";
import { downloadBlob } from "@/utils/file";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import SroDeclarationDownloadLink from "./SroDeclarationDownloadLink";

jest.mock("@/app/actions/organisations/getOrganisationSroDeclaration");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

const ORGANISATION_ID = 1;
const LINK_TEXT = "Download SRO Declaration form";

const clickDownload = () =>
  fireEvent.click(screen.getByRole("button", { name: LINK_TEXT }));

describe("<SroDeclarationDownloadLink />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    window.location.hash = "";
  });

  it("downloads the organisation's SRO declaration", async () => {
    const blob = new Blob(["declaration"]);
    (getOrganisationSroDeclaration as jest.Mock).mockResolvedValue({
      blob,
      fileName: "declaration.pdf",
      contentType: "application/pdf",
    });

    render(<SroDeclarationDownloadLink organisationId={ORGANISATION_ID} />);
    clickDownload();

    await waitFor(() => {
      expect(downloadBlob).toHaveBeenCalledWith(blob, "declaration.pdf");
    });
    expect(getOrganisationSroDeclaration).toHaveBeenCalledWith(ORGANISATION_ID);
  });

  it("does not navigate when clicked", async () => {
    (getOrganisationSroDeclaration as jest.Mock).mockResolvedValue({
      blob: new Blob(["declaration"]),
      fileName: "declaration.pdf",
      contentType: "application/pdf",
    });

    render(<SroDeclarationDownloadLink organisationId={ORGANISATION_ID} />);
    clickDownload();

    await waitFor(() => expect(downloadBlob).toHaveBeenCalled());
    expect(window.location.hash).toEqual("");
  });

  it("shows an error when the download fails", async () => {
    (getOrganisationSroDeclaration as jest.Mock).mockRejectedValue(new Error());

    render(<SroDeclarationDownloadLink organisationId={ORGANISATION_ID} />);
    clickDownload();

    expect(
      await screen.findByText(
        /error occurred while downloading the SRO declaration/i
      )
    ).toBeInTheDocument();
    expect(downloadBlob).not.toHaveBeenCalled();
  });
});
