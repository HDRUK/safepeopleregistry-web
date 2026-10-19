import postOrganisationInvite from "@/app/actions/organisations/postOrganisationInvite";
import postOrganisationInviteToContactSuperadmin from "@/app/actions/organisations/postOrganisationInviteToContactSuperadmin";
import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import postOrganisationUnclaimedBeforeSuperadminInvitation from "@/app/actions/organisations/postOrganisationUnclaimedBeforeSuperadminInvitation";
import putOrganisation from "@/app/actions/organisations/putOrganisation";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { Organisation } from "@/types/application";
import {
  isOrganisationConflictError,
  OrganisationConflictError,
} from "@/utils/organisationConflictError";
import { act, renderHook, waitFor } from "../../utils/testUtils";
import useOrganisationInvite from "./useOrganisationInvite";

const mockUseFeatures = jest.fn(() => ({ isSroRequirementEnabled: true }));

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: () => mockUseFeatures(),
}));

jest.mock("@/app/actions/organisations/postOrganisationUnclaimed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/postOrganisationInvite", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/putOrganisation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock(
  "@/app/actions/organisations/postOrganisationUnclaimedBeforeSuperadminInvitation",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

jest.mock(
  "@/app/actions/organisations/postOrganisationInviteToContactSuperadmin",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

const mockedPostOrganisationUnclaimed = jest.mocked(postOrganisationUnclaimed);
const mockedPostOrganisationInvite = jest.mocked(postOrganisationInvite);
const mockedPutOrganisation = jest.mocked(putOrganisation);
const mockedPostOrganisationUnclaimedBeforeSuperadminInvitation = jest.mocked(
  postOrganisationUnclaimedBeforeSuperadminInvitation
);
const mockedPostOrganisationInviteToContactSuperadmin = jest.mocked(
  postOrganisationInviteToContactSuperadmin
);

const organisation = {
  organisation_name: "Example Organisation",
  lead_applicant_email: "lead@example.com",
};

const setupUseOrganisationInvite = (existingOrganisation?: Organisation) => {
  const onSuccess = jest.fn();
  const onError = jest.fn();

  const { result } = renderHook(() =>
    useOrganisationInvite({
      organisation: existingOrganisation,
      onSuccess,
      onError,
    })
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
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ reason })
        );
        expect(onError.mock.calls[0][0]).toBeInstanceOf(
          OrganisationConflictError
        );
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
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(isOrganisationConflictError(onError.mock.calls[0][0])).toBe(false);
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

  describe("when inviting an existing Organisation", () => {
    const existingOrganisation = mockedOrganisation({
      id: 2,
      organisation_name: "Example Organisation",
      lead_applicant_email: "old@example.com",
    });

    const changedOrganisation = {
      organisation_name: "Example Organisation",
      lead_applicant_email: "lead@example.com",
    };

    it("updates and invites the Organisation", async () => {
      mockedPutOrganisation.mockResolvedValue({
        ok: true,
        status: 200,
        message: "success",
        data: existingOrganisation,
      } as never);

      const { result, onSuccess, onError } =
        setupUseOrganisationInvite(existingOrganisation);

      let organisationId: number | undefined;

      await act(async () => {
        organisationId = await result.current.handleSubmit(changedOrganisation);
      });

      expect(organisationId).toBe(2);
      expect(mockedPostOrganisationInvite).toHaveBeenCalledWith(
        2,
        expect.anything()
      );
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it("reports an email_in_use conflict and does not invite", async () => {
      mockedPutOrganisation.mockResolvedValue({
        ok: false,
        status: 409,
        message: "conflict",
        data: "email_in_use",
      } as never);

      const { result, onSuccess, onError } =
        setupUseOrganisationInvite(existingOrganisation);

      let organisationId: number | undefined;

      await act(async () => {
        organisationId = await result.current.handleSubmit(changedOrganisation);
      });

      expect(organisationId).toBeUndefined();
      expect(mockedPostOrganisationInvite).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ reason: "email_in_use" })
      );
      expect(onError.mock.calls[0][0]).toBeInstanceOf(
        OrganisationConflictError
      );
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it("reports any other failure without a conflict reason", async () => {
      mockedPutOrganisation.mockResolvedValue({
        ok: false,
        status: 500,
        message: "failed",
        data: null,
      } as never);

      const { result, onSuccess, onError } =
        setupUseOrganisationInvite(existingOrganisation);

      await act(async () => {
        await result.current.handleSubmit(changedOrganisation);
      });

      expect(mockedPostOrganisationInvite).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(isOrganisationConflictError(onError.mock.calls[0][0])).toBe(false);
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  describe("when asking the superadmin to contact the Organisation", () => {
    beforeEach(() => {
      mockUseFeatures.mockReturnValue({ isSroRequirementEnabled: false });

      mockedPostOrganisationInviteToContactSuperadmin.mockResolvedValue({
        ok: true,
        status: 200,
        message: "success",
        data: null,
      } as never);
    });

    afterEach(() => {
      mockUseFeatures.mockReturnValue({ isSroRequirementEnabled: true });
    });

    it("creates the Organisation and notifies the superadmin", async () => {
      mockedPostOrganisationUnclaimedBeforeSuperadminInvitation.mockResolvedValue(
        {
          ok: true,
          status: 201,
          message: "success",
          data: 3,
        } as never
      );

      const { result, onSuccess, onError } = setupUseOrganisationInvite();

      let organisationId: number | undefined;

      await act(async () => {
        organisationId = await result.current.handleSubmit(organisation);
      });

      expect(organisationId).toBe(3);
      expect(
        mockedPostOrganisationInviteToContactSuperadmin
      ).toHaveBeenCalledWith(3, expect.anything(), expect.anything());
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it.each(["claimed_duplicate", "unclaimed_duplicate"] as const)(
      "reports a %s conflict and does not notify the superadmin",
      async reason => {
        mockedPostOrganisationUnclaimedBeforeSuperadminInvitation.mockResolvedValue(
          {
            ok: false,
            status: 409,
            message: "conflict",
            data: reason,
          } as never
        );

        const { result, onSuccess, onError } = setupUseOrganisationInvite();

        let organisationId: number | undefined;

        await act(async () => {
          organisationId = await result.current.handleSubmit(organisation);
        });

        expect(organisationId).toBeUndefined();
        expect(
          mockedPostOrganisationInviteToContactSuperadmin
        ).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ reason })
        );
        expect(onError.mock.calls[0][0]).toBeInstanceOf(
          OrganisationConflictError
        );
        expect(onSuccess).not.toHaveBeenCalled();
      }
    );

    it("reports any other failure without a conflict reason", async () => {
      mockedPostOrganisationUnclaimedBeforeSuperadminInvitation.mockResolvedValue(
        {
          ok: false,
          status: 500,
          message: "failed",
          data: null,
        } as never
      );

      const { result, onSuccess, onError } = setupUseOrganisationInvite();

      await act(async () => {
        await result.current.handleSubmit(organisation);
      });

      expect(
        mockedPostOrganisationInviteToContactSuperadmin
      ).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(isOrganisationConflictError(onError.mock.calls[0][0])).toBe(false);
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});
