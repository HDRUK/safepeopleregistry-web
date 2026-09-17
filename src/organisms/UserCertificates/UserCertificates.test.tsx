import { getTrainingByRegistryId } from "@/app/actions/trainings";
import { mockedFile } from "@/mocks/data/file";
import { mockedTraining } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import UserCertificates from "./UserCertificates";

jest.mock("@/app/actions/trainings");

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
