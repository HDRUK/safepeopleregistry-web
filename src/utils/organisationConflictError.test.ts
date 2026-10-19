import messages from "@/config/locales/en.json";
import {
  assertOrganisationResponseOk,
  getOrganisationConflictErrorKey,
  isOrganisationConflictError,
  isOrganisationConflictReason,
  ORGANISATION_CONFLICT_REASONS,
  OrganisationConflictError,
} from "./organisationConflictError";

describe("isOrganisationConflictReason", () => {
  it.each([
    "duplicate",
    "email_in_use",
    "claimed_duplicate",
    "unclaimed_duplicate",
  ])("accepts %s", reason => {
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
  it.each([
    "duplicate",
    "email_in_use",
    "claimed_duplicate",
    "unclaimed_duplicate",
  ] as const)("keeps the known reason %s", reason => {
    const error = new OrganisationConflictError(reason);

    expect(error.reason).toBe(reason);
    expect(error.status).toBe(409);
  });

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

describe("getOrganisationConflictErrorKey", () => {
  it.each([
    ["duplicate", "organisationConflictDuplicate"],
    ["email_in_use", "organisationConflictEmailInUse"],
    ["claimed_duplicate", "organisationConflictClaimedDuplicate"],
    ["unclaimed_duplicate", "organisationConflictUnclaimedDuplicate"],
  ] as const)("maps %s to %s", (reason, key) => {
    expect(
      getOrganisationConflictErrorKey(new OrganisationConflictError(reason))
    ).toBe(key);
  });

  it("finds the conflict among several errors", () => {
    expect(
      getOrganisationConflictErrorKey([
        new Error("other"),
        new OrganisationConflictError("email_in_use"),
      ])
    ).toBe("organisationConflictEmailInUse");
  });

  it.each([
    ["an unknown reason", new OrganisationConflictError("other")],
    ["a non-conflict error", new Error("postOrganisationUnclaimedError")],
    ["no errors", []],
    ["undefined", undefined],
    ["null", null],
  ])("returns undefined for %s", (_, error) => {
    expect(getOrganisationConflictErrorKey(error)).toBeUndefined();
  });

  it.each(ORGANISATION_CONFLICT_REASONS)(
    "has a translation for the %s key",
    reason => {
      const key = getOrganisationConflictErrorKey(
        new OrganisationConflictError(reason)
      );

      expect(key).toBeDefined();
      expect(messages.Application).toHaveProperty(key as string);
    }
  );
});

describe("assertOrganisationResponseOk", () => {
  it("returns an ok response unchanged", () => {
    const response = { ok: true, status: 200, data: 1 };

    expect(assertOrganisationResponseOk(response, "requestError")).toBe(
      response
    );
  });

  it.each(["duplicate", "email_in_use", null])(
    "throws an OrganisationConflictError for a 409 with %p",
    data => {
      const response = { ok: false, status: 409, data };

      expect(() =>
        assertOrganisationResponseOk(response, "requestError")
      ).toThrow(OrganisationConflictError);
    }
  );

  it("throws an Error with the given message for any other failure", () => {
    const response = { ok: false, status: 500, data: null };

    let thrown: unknown;

    try {
      assertOrganisationResponseOk(response, "requestError");
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toEqual(new Error("requestError"));
    expect(isOrganisationConflictError(thrown)).toBe(false);
  });
});
