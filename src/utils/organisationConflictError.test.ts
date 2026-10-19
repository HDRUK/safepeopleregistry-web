import {
  isOrganisationConflictError,
  isOrganisationConflictReason,
  OrganisationConflictError,
} from "./organisationConflictError";

describe("isOrganisationConflictReason", () => {
  it.each(["duplicate", "email_in_use"])("accepts %s", reason => {
    expect(isOrganisationConflictReason(reason)).toBe(true);
  });

  it.each([null, undefined, "", "other", "DUPLICATE", 409, {}])(
    "rejects %p",
    value => {
      expect(isOrganisationConflictReason(value)).toBe(false);
    }
  );
});

describe("OrganisationConflictError", () => {
  it.each(["duplicate", "email_in_use"] as const)(
    "keeps the known reason %s",
    reason => {
      const error = new OrganisationConflictError(reason);

      expect(error.reason).toBe(reason);
      expect(error.status).toBe(409);
    }
  );

  it.each([null, undefined, "other", 1])(
    "falls back to unknown for %p",
    reason => {
      expect(new OrganisationConflictError(reason).reason).toBe("unknown");
    }
  );

  it("is an Error", () => {
    expect(new OrganisationConflictError("duplicate")).toBeInstanceOf(Error);
  });
});

describe("isOrganisationConflictError", () => {
  it("identifies an OrganisationConflictError", () => {
    expect(
      isOrganisationConflictError(new OrganisationConflictError("duplicate"))
    ).toBe(true);
  });

  it.each([new Error("conflict"), null, undefined, { reason: "duplicate" }])(
    "rejects %p",
    value => {
      expect(isOrganisationConflictError(value)).toBe(false);
    }
  );
});
