import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { formatDBDateTime } from "@/utils/date";
import { useMutation } from "@tanstack/react-query";
import { renderHook } from "@/utils/testUtils";
import useSubmitAffiliation from "./useSubmitAffiliation";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const mockCreateAndInviteOrganisation = jest.fn();

jest.mock("@/queries/useOrganisationInvite", () => ({
  __esModule: true,
  default: () => ({
    queryState: {},
    handleSubmit: mockCreateAndInviteOrganisation,
    mutateOrganisationInvite: jest.fn(),
  }),
}));

const mockPostAffiliation = jest.fn();
const mockPutAffiliation = jest.fn();

const user = mockedUser({ id: 2, registry_id: 3 });

const fields = {
  ...mockedAffiliation({ organisation_id: 5 }),
  from: "2026-01-01",
  to: "2027-01-01",
  organisation_name: "Example University",
  organisation_email: "sro@university.example.com",
} as PostAffiliationPayload;

const expectedPayload = () => {
  const {
    organisation_name: _name,
    organisation_email: _email,
    ...rest
  } = fields;

  return {
    ...rest,
    from: formatDBDateTime(fields.from),
    to: formatDBDateTime(fields.to),
  };
};

const setup = () => renderHook(() => useSubmitAffiliation({ user })).result;

describe("useSubmitAffiliation", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockImplementation(
      ({ mutationKey }: { mutationKey: string[] }) => ({
        mutateAsync:
          mutationKey[0] === "putAffiliation"
            ? mockPutAffiliation
            : mockPostAffiliation,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates an affiliation with formatted dates and no organisation details", async () => {
    const result = setup();

    await expect(result.current.submitAffiliation(fields)).resolves.toBe(true);

    expect(mockPostAffiliation).toHaveBeenCalledWith(expectedPayload());
    expect(mockPutAffiliation).not.toHaveBeenCalled();
  });

  it("updates the affiliation it is given", async () => {
    const result = setup();

    await expect(result.current.submitAffiliation(fields, 9)).resolves.toBe(
      true
    );

    expect(mockPutAffiliation).toHaveBeenCalledWith({
      affiliationId: 9,
      payload: expectedPayload(),
    });
    expect(mockPostAffiliation).not.toHaveBeenCalled();
  });

  it("creates and invites an organisation that isn't listed, then affiliates to it", async () => {
    mockCreateAndInviteOrganisation.mockResolvedValue(42);
    const result = setup();

    await result.current.submitAffiliation({
      ...fields,
      organisation_id: undefined,
    } as unknown as PostAffiliationPayload);

    expect(mockCreateAndInviteOrganisation).toHaveBeenCalledWith({
      organisation_name: "Example University",
      lead_applicant_email: "sro@university.example.com",
    });
    expect(mockPostAffiliation).toHaveBeenCalledWith(
      expect.objectContaining({ organisation_id: 42 })
    );
  });

  it("saves nothing when the organisation can't be created", async () => {
    mockCreateAndInviteOrganisation.mockResolvedValue(undefined);
    const result = setup();

    await expect(
      result.current.submitAffiliation({
        ...fields,
        organisation_id: undefined,
      } as unknown as PostAffiliationPayload)
    ).resolves.toBe(false);

    expect(mockPostAffiliation).not.toHaveBeenCalled();
    expect(mockPutAffiliation).not.toHaveBeenCalled();
  });
});
