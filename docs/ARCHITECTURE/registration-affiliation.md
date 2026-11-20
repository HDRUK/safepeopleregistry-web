# Registration affiliation

A researcher (`UserGroup.USERS`) is **fully signed up** only once they have a current affiliation on which they've done everything they can. Until then, the web app sends them to the affiliation step at `/add-affiliation` instead of their profile. This applies to new researchers (after setting their password and accepting the terms) and to existing researchers at their next page load. Organisation, custodian and admin users never see the step.

This is an **onboarding step, not access control**. The redirect only decides which page a researcher lands on; the API doesn't refuse requests from researchers who aren't signed up.

## Where the decision comes from

The API decides; the web app only reads the answer. `GET /auth/me` returns two extra fields, typed on `User` in [`src/types/application.ts`](../../src/types/application.ts):

- **`registration_complete`**: whether the researcher is fully signed up.
- **`registration_affiliation`**: the affiliation the step should act on (`RegistrationAffiliation`), or `null`.

Which affiliations count, and which one is returned, is defined in the API. See `docs/ARCHITECTURE/registration-affiliation.md` in `safepeopleregistry-api`.

A **missing `registration_complete` counts as complete**, so the web app can be deployed before the API without locking anyone out.

## The redirect

[`isRegistrationIncomplete`](../../src/utils/user.ts) is true only for a researcher whose `registration_complete` is `false`. [`getProfileRedirectPath`](../../src/utils/redirect-utils.ts) checks it after the no-organisation rule and returns `ROUTES.addAffiliation.path`.

It runs in two places, both in [`src/utils/router.ts`](../../src/utils/router.ts):

- **`redirectApplication`**, from the `(logged-in)` layout and the root page. Researchers who need the step are sent there from any logged-in page.
- **`redirectProfile`**, from `(user-only)` pages, including the step itself. Anyone already signed up is sent from the step to their profile.

Things to know:

- **The route is `/add-affiliation`, not `/register-affiliation`.** `redirectToPath` in [`src/utils/redirects.ts`](../../src/utils/redirects.ts) compares paths by substring, and `/register` is a substring of `/register-affiliation`.
- **The redirect runs on the server, on full page loads.** A researcher whose last qualifying affiliation ends mid-session is sent to the step on their next full page load, not on client-side navigation.
- **Registering an invitee reloads the user.** The step reads the user that `ApplicationUser` loads into the store, and the `(user-only)` layout stays mounted from `/register` to `/add-affiliation`. So `AccountConfirm` invalidates `getMe` after registering an invitee; otherwise the step shows the user loaded before they registered, with no invited affiliation to prefill.

## The page

The route lives in [`src/app/[locale]/(user-only)/add-affiliation/`](../../src/app/%5Blocale%5D/%28user-only%29/add-affiliation/). `AddAffiliation` picks its view from `registration_affiliation`:

- **Nothing returned:** an empty `AffiliationsForm`.
- **An invited affiliation** (`affiliation_info_required`): the form prefilled from it, with the organisation locked (`lockOrganisation`: the select is disabled and there's no "not listed" link to type a different one) and the email kept. Saving completes that affiliation (PUT) rather than creating a second one. The form doesn't submit its disabled fields, so `handleSubmit` adds the organisation and email back. The API needs the email to see that it matches the login email and skip verification.
- **Waiting on email verification** (`affiliation_email_verify`): `CheckYourEmail`, with Resend and a line to contact enquiries. There's deliberately no way to change the email from here.

Saving goes through [`useSubmitAffiliation`](../../src/hooks/useSubmitAffiliation/), shared with the profile's affiliations page, including inviting an organisation that isn't listed. After saving, the page refetches `/me` and refreshes, so the researcher either sees the check-your-email view or is redirected to their profile.

## Verification links

The verification email links to `/user/profile/affiliations?verify=<code>`. That link works whether or not the researcher has finished signing up:

1. [`src/proxy.ts`](../../src/proxy.ts) sets `x-current-search` alongside `x-current-path`, overwriting anything the client sent.
2. When `redirectApplication` sends a researcher to the step, it builds the URL with `getAddAffiliationPath` in [`src/utils/redirect-utils.ts`](../../src/utils/redirect-utils.ts). It keeps `verify` only when `isVerificationCode` in [`src/utils/affiliations.ts`](../../src/utils/affiliations.ts) accepts it, drops every other parameter, and always targets the fixed route.
3. The step's `page.tsx` verifies the code **before** calling `redirectProfile`, so a researcher whose verification completes sign-up goes straight to their profile. A failed verification shows the standard error alert.
4. Both the step and the profile's affiliations page call [`useRemoveSearchParam("verify")`](../../src/hooks/useRemoveSearchParam/). It removes the code from the address bar with `history.replaceState`, so it doesn't stay in browser history or leak in a `Referer` header.

## Tests

- **Jest**
  - The redirect: `src/utils/redirect-utils.test.ts`, `src/utils/router.test.ts` and `src/utils/user.test.ts`.
  - The page: the tests next to `AddAffiliation` and `CheckYourEmail`. The step's `page.tsx` has no test of its own; Cypress covers its verification.
  - Shared pieces: `useSubmitAffiliation`, `useRemoveSearchParam` and `src/utils/affiliations.test.ts`.
- **Cypress**
  - `registration/registerUser.cy.ts`: sign up, add an affiliation with a different email, follow the verification link, land on the profile. It approves the seeded organisation as an admin first, because researchers can only pick approved organisations.
  - `admin/inviteUser.cy.ts`: an admin invites a researcher to an organisation, the researcher signs up with the invited email, completes the prefilled, locked affiliation without verifying, and lands on the profile.

Run a single Jest file with `--forceExit`. Some suites leave a `MessagePort` handle open, and Jest otherwise hangs after the tests pass.

## Deploying

- **Deploy the API first.** The web app still works against an older API, but the step won't appear until the API sends `registration_complete`.
- **Existing researchers are affected straight away.** Anyone without a qualifying affiliation sees the step at their next page load, so tell them before the release.

## Known follow-ups

- **A failed verification on the profile's affiliations page shows nothing.** `AffiliationsPage` uses translation keys that don't exist (`affiliationRequestSentErrorDescription`, `affiliationRequestSentErrorButton`), and its alert only runs when an organisation name comes back.
- **The API decides on verification from the request, not the saved email.** `AffiliationController::update` compares the email in the request with the login email, so a client that leaves the email out triggers verification even when the saved email matches. Editing an unverified affiliation on the profile page does this, because that form also disables an email that's already set.
- **Jest open handle.** The `MessagePort` left open by the heavier suites is why single-file runs need `--forceExit`.
