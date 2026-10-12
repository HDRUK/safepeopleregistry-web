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
  const hasSroAssigned = Boolean(organisation?.sro_officer);

  return isSroRequirementEnabled ? (
    <SroForm isDelegate={isDelegate} hasSroAssigned={hasSroAssigned} />
  ) : (
    <SroInvite hasSroAssigned={hasSroAssigned} />
  );
}
