import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";
import getOrganisationSroDeclarationDetails from "@/app/actions/organisations/getOrganisationSroDeclarationDetails";
import { FileStatus } from "@/consts/files";
import { mockedSroDeclarationFile } from "@/mocks/data/file";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { FileDetails } from "@/types/application";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import OrganisationsSroDetails, {
  OrganisationsSroDetailsProps,
} from "./OrganisationsSroDetails";

jest.mock("@/app/actions/organisations/getOrganisationSroDeclaration");
jest.mock("@/app/actions/organisations/getOrganisationSroDeclarationDetails");

// The API hides an organisation's files.
const organisation = mockedOrganisation({ files: undefined });

const DOWNLOAD_LINK = { name: "Download SRO Declaration form" };

const TestComponent = (props?: Partial<OrganisationsSroDetailsProps>) => {
  return <OrganisationsSroDetails organisation={organisation} {...props} />;
};

const setupTest = (props?: Partial<OrganisationsSroDetailsProps>) => {
  return render(<TestComponent {...props} />);
};

const renderWithDeclaration = async (latest: FileDetails | null) => {
  (getOrganisationSroDeclarationDetails as jest.Mock).mockResolvedValue({
    data: latest,
  });

  setupTest();

  await waitFor(() =>
    expect(getOrganisationSroDeclarationDetails).toHaveBeenCalledWith(
      organisation.id,
      expect.anything()
    )
  );
};

describe("<OrganisationsSroDetails />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main fields with correct values", () => {
    setupTest();

    expect(screen.getByText(organisation.sro_profile_uri)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${organisation.sro_officer?.first_name} ${organisation.sro_officer?.last_name}`
      )
    ).toBeInTheDocument();
  });

  it("offers a single download of the latest declaration once it has been processed", async () => {
    await renderWithDeclaration(
      mockedSroDeclarationFile({ id: 1, status: FileStatus.PROCESSED })
    );

    expect(await screen.findAllByRole("button", { name: /download/i })).toEqual(
      [screen.getByRole("button", DOWNLOAD_LINK)]
    );
  });

  it.each([FileStatus.PENDING, FileStatus.FAILED])(
    "does not offer a download while the latest declaration is %s",
    async status => {
      await renderWithDeclaration(mockedSroDeclarationFile({ id: 1, status }));

      expect(
        screen.queryByRole("button", DOWNLOAD_LINK)
      ).not.toBeInTheDocument();
    }
  );

  it("does not offer a download when there is no declaration", async () => {
    await renderWithDeclaration(null);

    expect(screen.queryByRole("button", DOWNLOAD_LINK)).not.toBeInTheDocument();
  });

  it("does not download the declaration just to show the page", async () => {
    await renderWithDeclaration(
      mockedSroDeclarationFile({ id: 1, status: FileStatus.PROCESSED })
    );

    await screen.findByRole("button", DOWNLOAD_LINK);
    expect(getOrganisationSroDeclaration).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
