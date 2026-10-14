"use client";

import { useFeatures } from "@/components/FeatureProvider";
import { OrganisationRole } from "@/consts/user";
import { useStore } from "@/data/store";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { getOrganisationRole } from "@/utils/organisationRole";
import SroForm from "./SroForm";
import SroInvite from "./SroInvite";

export default function Sro() {
  const { isSroRequirementEnabled } = useFeatures();

  const { organisation } = useOrganisationStore();
  const user = useStore(state => state.getUser());

  const isDelegate =
    !user || getOrganisationRole(user) !== OrganisationRole.SRO;
  // Treated as assigned unless the API says otherwise, so delegates stay locked out
  // when has_claimed_sro has not been loaded. Mirrors OrganisationPolicy::performSroRestrictedAction.
  const hasClaimedSro = organisation?.has_claimed_sro !== false;
  const hasClaimedSroDetails = Boolean(organisation?.claimed_sro);

  return isSroRequirementEnabled ? (
    <SroForm isDelegate={isDelegate} hasSroAssigned={hasClaimedSro} />
  ) : (
    <SroInvite hasSroAssigned={hasClaimedSroDetails} />
  );
}
