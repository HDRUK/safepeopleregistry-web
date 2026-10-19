// Mirrors the reasons the API returns in the body of a 409 from
// POST /organisations/unclaimed, PUT /organisations/{id} and
// POST /organisations/unclaimed_before_superadmin_invitation. Kept in sync by
// hand.
const ORGANISATION_CONFLICT_REASONS = [
  "duplicate",
  "email_in_use",
  "claimed_duplicate",
  "unclaimed_duplicate",
] as const;

type OrganisationConflictReason =
  (typeof ORGANISATION_CONFLICT_REASONS)[number];

function isOrganisationConflictReason(
  value: unknown
): value is OrganisationConflictReason {
  return ORGANISATION_CONFLICT_REASONS.some(reason => reason === value);
}

class OrganisationConflictError extends Error {
  readonly status = 409;

  readonly reason: OrganisationConflictReason | "unknown";

  constructor(reason: unknown) {
    super("organisationConflictError");

    this.name = "OrganisationConflictError";
    this.reason = isOrganisationConflictReason(reason) ? reason : "unknown";
  }
}

function isOrganisationConflictError(
  error: unknown
): error is OrganisationConflictError {
  return error instanceof OrganisationConflictError;
}

interface OrganisationResponse {
  ok: boolean;
  status: number;
  data?: unknown;
}

// For actions called with suppressThrow. Errors thrown inside a server action
// lose their message in production, so failures are turned into errors here,
// on the client, where the 409 reason survives.
function assertOrganisationResponseOk<T extends OrganisationResponse>(
  response: T,
  errorMessage: string
): T {
  if (response.status === 409) {
    throw new OrganisationConflictError(response.data);
  }

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
}

type OrganisationConflictErrorKey =
  | "organisationConflictDuplicate"
  | "organisationConflictEmailInUse"
  | "organisationConflictClaimedDuplicate"
  | "organisationConflictUnclaimedDuplicate";

// Keys live in the Application namespace. Returns undefined when there is no
// known conflict, so callers keep their default error text.
function getOrganisationConflictErrorKey(
  error: unknown
): OrganisationConflictErrorKey | undefined {
  const errors = Array.isArray(error) ? error : [error];
  const conflictError = errors.find(isOrganisationConflictError);

  if (!conflictError) {
    return undefined;
  }

  const { reason } = conflictError;

  switch (reason) {
    case "duplicate":
      return "organisationConflictDuplicate";
    case "email_in_use":
      return "organisationConflictEmailInUse";
    case "claimed_duplicate":
      return "organisationConflictClaimedDuplicate";
    case "unclaimed_duplicate":
      return "organisationConflictUnclaimedDuplicate";
    case "unknown":
      return undefined;
    default: {
      const unhandled: never = reason;

      return unhandled;
    }
  }
}

export type { OrganisationConflictErrorKey, OrganisationConflictReason };

export {
  assertOrganisationResponseOk,
  getOrganisationConflictErrorKey,
  ORGANISATION_CONFLICT_REASONS,
  isOrganisationConflictError,
  isOrganisationConflictReason,
  OrganisationConflictError,
};
