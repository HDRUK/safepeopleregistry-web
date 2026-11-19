import { mockedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { UserGroup } from "@/consts/user";
import {
  getInitialsFromUser,
  isOrcIdCompleted,
  isOrcIdScanning,
  isRegistrationIncomplete,
} from "@/utils/user";

describe("isRegistrationIncomplete", () => {
  it("is incomplete for a researcher who still needs an affiliation", () => {
    const user = mockedUser({
      user_group: UserGroup.USERS,
      registration_complete: false,
    });

    expect(isRegistrationIncomplete(user)).toBe(true);
  });

  it.each([
    [
      "a researcher who is fully signed up",
      { user_group: UserGroup.USERS, registration_complete: true },
    ],
    [
      "a researcher when the API doesn't send the field",
      { user_group: UserGroup.USERS, registration_complete: undefined },
    ],
    [
      "an organisation user",
      { user_group: UserGroup.ORGANISATIONS, registration_complete: false },
    ],
  ])("is complete for %s", (_, user) => {
    expect(isRegistrationIncomplete(mockedUser(user))).toBe(false);
  });
});

describe("getInitialsFromUser", () => {
  it("gets the correct initials", () => {
    const user = mockedUser({
      first_name: "John",
      last_name: "Smith",
    });
    const result = getInitialsFromUser(user);

    expect(result).toEqual("JS");
  });
});

describe("isOrcIdScanning", () => {
  it("is scanning", () => {
    const user = mockedUser({
      orcid_scanning: true,
    });
    const result = isOrcIdScanning(user);

    expect(result).toBe(true);
  });

  it("isn't scanning", () => {
    const user = mockedUser({
      orcid_scanning: false,
    });
    const result = isOrcIdScanning(user);

    expect(result).toBe(false);
  });
});

describe("isOrcIdCompleted", () => {
  it("is completed", () => {
    const user = mockedUser({
      orcid_scanning_completed_at: faker.date.recent().toISOString(),
    });
    const result = isOrcIdCompleted(user);

    expect(result).toBe(true);
  });

  it("isn't scanning", () => {
    const user = mockedUser({
      orcid_scanning_completed_at: null,
    });
    const result = isOrcIdCompleted(user);

    expect(result).toBe(false);
  });
});
