import { useStore } from "@/data/store";
import { mockedFile } from "@/mocks/data/file";
import { mockedTraining, mockedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { mock200Json } from "jest.utils";
import { useRouter } from "next/navigation";
import {
  getTrainingByRegistryId,
  postTrainings,
} from "@/app/actions/trainings";
import downloadFile from "@/app/actions/files/downloadFile";
import getTrainingByRegistryIdAction from "@/app/actions/trainings/getTrainingByRegistryId";
import { downloadBlob } from "@/utils/file";
import { EntityType } from "../../types/api";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../../utils/testUtils";
import Training from "./Training";

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

jest.mock("@/app/actions/trainings");
jest.mock("@/app/actions/trainings/getTrainingByRegistryId");
jest.mock("@/app/actions/files/downloadFile");
jest.mock("@/data/store");
jest.mock("@/utils/file", () => ({
  ...jest.requireActual("@/utils/file"),
  downloadBlob: jest.fn(),
}));

const mockSetUser = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `
    {"identity": {"dob": false, "score": 67, "last_name": true, "first_name": true}}
  `,
  profile_completed_at: null,
});

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);

(getTrainingByRegistryId as jest.Mock).mockResolvedValue({
  data: [mockedTraining],
});
(postTrainings as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);
const renderTrainingComponent = () => {
  return render(<Training variant={EntityType.USER} />);
};

describe("<Training />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([/Training provider/i, /Training course name/i])(
    "does not submit when %s is not defined",
    async fieldName => {
      renderTrainingComponent();

      const addButton = screen.getByRole("button", {
        name: /add training course/i,
      });
      fireEvent.click(addButton);

      const input = screen.getByRole("textbox", { name: fieldName });
      fireEvent.change(input, { target: { value: faker.string.sample() } });

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument();
      });

      expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();

      act(() => {
        fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
      });

      await waitFor(() => {
        expect(postTrainings).not.toHaveBeenCalled();
      });
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTrainingComponent());
  });

  describe("when viewed by a custodian", () => {
    const certificateFileId = 5;
    const custodianViewedUser = mockedUser({
      registry_id: 123,
      registry: { files: [mockedFile({ id: certificateFileId })] },
    });

    const clickDownload = async () =>
      userEvent.click(await screen.findByRole("button", { name: "Download" }));

    beforeEach(() => {
      (getTrainingByRegistryIdAction as jest.Mock).mockResolvedValue({
        data: [
          mockedTraining({ certification_id: certificateFileId }),
          mockedTraining({ certification_id: undefined }),
          mockedTraining({ certification_id: 6 }),
        ],
      });

      render(
        <Training variant={EntityType.CUSTODIAN} user={custodianViewedUser} />
      );
    });

    it("displays a download button only for training with a certificate in the user's files", async () => {
      expect(
        await screen.findAllByRole("button", { name: "Download" })
      ).toHaveLength(1);
    });

    it("downloads the certificate file when the download button is clicked", async () => {
      const mockBlob = new Blob(["certificate"]);
      (downloadFile as jest.Mock).mockResolvedValue({
        blob: mockBlob,
        fileName: "cert.pdf",
      });

      await clickDownload();

      await waitFor(() => {
        expect(downloadBlob).toHaveBeenCalledWith(mockBlob, "cert.pdf");
      });
      expect(downloadFile).toHaveBeenCalledWith(certificateFileId);
    });

    it("displays an error when the certificate download fails", async () => {
      (downloadFile as jest.Mock).mockRejectedValue(new Error());

      await clickDownload();

      expect(
        await screen.findByText(
          /error occurred while downloading the certificate/i
        )
      ).toBeInTheDocument();
      expect(downloadBlob).not.toHaveBeenCalled();
    });
  });
});
