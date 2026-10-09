import downloadFile from "@/app/actions/files/downloadFile";
import getTrainingByRegistryId from "@/app/actions/trainings/getTrainingByRegistryId";
import { mockedFile } from "@/mocks/data/file";
import { mockedTraining } from "@/mocks/data/user";
import { downloadBlob } from "@/utils/file";
import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "../../utils/testUtils";
import UserCertificates from "./UserCertificates";

jest.mock("@/app/actions/trainings/getTrainingByRegistryId");
jest.mock("@/app/actions/files/downloadFile");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

describe("<UserCertificates />", () => {
  const certificateFile = mockedFile({ id: 1, name: "cert.pdf" });
  const trainingWithCertificate = mockedTraining({
    id: 1,
    training_name: "Data Protection Training",
    certification_id: certificateFile.id,
  });
  const trainingWithoutCertificate = mockedTraining({
    id: 2,
    training_name: "GCP Training",
    certification_id: undefined,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      current: {
        user: {
          registry_id: 123,
          registry: {
            files: [certificateFile],
          },
        },
      },
    });

    (getTrainingByRegistryId as jest.Mock).mockResolvedValue({
      data: [trainingWithCertificate, trainingWithoutCertificate],
    });
  });

  it("displays certificates that have an attached file", async () => {
    render(<UserCertificates />);

    await waitFor(() => {
      expect(screen.getByText("Data Protection Training")).toBeInTheDocument();
    });
  });

  it("does not display training entries without a certificate file", async () => {
    render(<UserCertificates />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    expect(screen.queryByText("GCP Training")).not.toBeInTheDocument();
  });

  it("displays a download button for each certificate", async () => {
    render(<UserCertificates />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /download/i })
      ).toBeInTheDocument();
    });
  });

  it("downloads the certificate file when the download button is clicked", async () => {
    const mockBlob = new Blob(["certificate contents"], {
      type: "application/pdf",
    });

    (downloadFile as jest.Mock).mockResolvedValue({
      blob: mockBlob,
      fileName: "cert.pdf",
      contentType: "application/pdf",
    });

    render(<UserCertificates />);

    await userEvent.click(
      await screen.findByRole("button", { name: /download/i })
    );

    await waitFor(() => {
      expect(downloadBlob).toHaveBeenCalledWith(mockBlob, "cert.pdf");
    });
    expect(downloadFile).toHaveBeenCalledWith(certificateFile.id);
  });

  it("displays an error when the certificate download fails", async () => {
    (downloadFile as jest.Mock).mockRejectedValue(
      new Error("Failed to download file (status 404)")
    );

    render(<UserCertificates />);

    await userEvent.click(
      await screen.findByRole("button", { name: /download/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error occurred while downloading the certificate/i)
      ).toBeInTheDocument();
    });
    expect(downloadBlob).not.toHaveBeenCalled();
  });

  it("displays a no results message when there are no certificates", async () => {
    (getTrainingByRegistryId as jest.Mock).mockResolvedValue({
      data: [],
    });

    render(<UserCertificates />);

    await waitFor(() => {
      expect(
        screen.getByText(/currently has no certificates/i)
      ).toBeInTheDocument();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<UserCertificates />));
  });
});
