// Mirrors the reasons the API returns in the body of a 409 from
// POST /organisations/unclaimed. Kept in sync by hand.
const ORGANISATION_CONFLICT_REASONS = ["duplicate", "email_in_use"] as const;

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

export type { OrganisationConflictReason };

export {
  ORGANISATION_CONFLICT_REASONS,
  isOrganisationConflictError,
  isOrganisationConflictReason,
  OrganisationConflictError,
};
