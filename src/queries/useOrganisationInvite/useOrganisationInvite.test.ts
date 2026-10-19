import postOrganisationInvite from "@/app/actions/organisations/postOrganisationInvite";
import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import {
  isOrganisationConflictError,
  OrganisationConflictError,
} from "@/utils/organisationConflictError";
import { act, renderHook, waitFor } from "../../utils/testUtils";
import useOrganisationInvite from "./useOrganisationInvite";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: () => ({ isSroRequirementEnabled: true }),
}));

jest.mock("@/app/actions/organisations/postOrganisationUnclaimed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/postOrganisationInvite", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedPostOrganisationUnclaimed = jest.mocked(postOrganisationUnclaimed);
const mockedPostOrganisationInvite = jest.mocked(postOrganisationInvite);

const organisation = {
  organisation_name: "Example Organisation",
  lead_applicant_email: "lead@example.com",
};

const setupUseOrganisationInvite = () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();

  const { result } = renderHook(() =>
    useOrganisationInvite({ onSuccess, onError })
  );

  return { result, onSuccess, onError };
};

const getErrors = (error: unknown) => (Array.isArray(error) ? error : [error]);

describe("useOrganisationInvite", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedPostOrganisationInvite.mockResolvedValue({
      ok: true,
      status: 200,
      message: "success",
      data: null,
    } as never);
  });

  describe("when inviting an Organisation directly", () => {
    it("creates and invites the Organisation", async () => {
      mockedPostOrganisationUnclaimed.mockResolvedValue({
        ok: true,
        status: 201,
        message: "success",
        data: 1,
      } as never);

      const { result, onSuccess, onError } = setupUseOrganisationInvite();

      let organisationId: number | undefined;

      await act(async () => {
        organisationId = await result.current.handleSubmit(organisation);
      });

      expect(organisationId).toBe(1);
      expect(mockedPostOrganisationInvite).toHaveBeenCalledWith(
        1,
        expect.anything()
      );
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it.each(["duplicate", "email_in_use"] as const)(
      "reports a %s conflict and does not invite",
      async reason => {
        mockedPostOrganisationUnclaimed.mockResolvedValue({
          ok: false,
          status: 409,
          message: "conflict",
          data: reason,
        } as never);

        const { result, onSuccess, onError } = setupUseOrganisationInvite();

        let organisationId: number | undefined;

        await act(async () => {
          organisationId = await result.current.handleSubmit(organisation);
        });

        expect(organisationId).toBeUndefined();
        expect(mockedPostOrganisationInvite).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();

        await waitFor(() => {
          expect(result.current.queryState.isError).toBe(true);
        });

        const conflictError = getErrors(result.current.queryState.error).find(
          isOrganisationConflictError
        );

        expect(conflictError).toBeInstanceOf(OrganisationConflictError);
        expect(conflictError?.reason).toBe(reason);
      }
    );

    it("reports any other failure without a conflict reason", async () => {
      mockedPostOrganisationUnclaimed.mockResolvedValue({
        ok: false,
        status: 500,
        message: "failed",
        data: null,
      } as never);

      const { result, onSuccess, onError } = setupUseOrganisationInvite();

      await act(async () => {
        await result.current.handleSubmit(organisation);
      });

      expect(mockedPostOrganisationInvite).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.queryState.isError).toBe(true);
      });

      expect(
        getErrors(result.current.queryState.error).some(
          isOrganisationConflictError
        )
      ).toBe(false);
    });
  });
});
