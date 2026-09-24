import getOrganisationDelegatesQuery from "@/services/organisations/getOrganisationDelegatesQuery";
import getOrganisationQuery from "@/services/organisations/getOrganisationQuery";
import getOrganisationRegistriesQuery from "@/services/organisations/getOrganisationRegistriesQuery";
import postCustodianInviteUserQuery from "@/services/organisations/postCustodianInviteUserQuery";
import postOrganisationInviteQuery from "@/services/organisations/postOrganisationInviteQuery";
import postOrganisationInviteUserQuery from "@/services/organisations/postOrganisationInviteUserQuery";
import postOrganisationInviteToContactSuperadminQuery from "@/services/organisations/postOrganisationInviteToContactSuperadminQuery";
import postOrganisationUnclaimedQuery from "@/services/organisations/postOrganisationUnclaimedQuery";
import postOrganisationUnclaimedBeforeSuperadminInvitationQuery from "@/services/organisations/postOrganisationUnclaimedBeforeSuperadminInvitationQuery";
import putOrganisationApprovedQuery from "@/services/organisations/putOrganisationApprovedQuery";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import usePagedSponsoredProjectsQuery from "@/services/organisations/usePagedSponsoredProjectsQuery";

export {
  putOrganisationApprovedQuery,
  getOrganisationQuery,
  postOrganisationInviteUserQuery,
  postOrganisationInviteToContactSuperadminQuery,
  getOrganisationDelegatesQuery,
  getOrganisationRegistriesQuery,
  postOrganisationUnclaimedQuery,
  postOrganisationUnclaimedBeforeSuperadminInvitationQuery,
  postOrganisationInviteQuery,
  useOrganisationsQuery,
  postCustodianInviteUserQuery,
  usePagedSponsoredProjectsQuery,
};

export type * from "./types";
