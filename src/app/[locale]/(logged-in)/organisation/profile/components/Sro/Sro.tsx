"use client";

import { useFeatures } from "@/components/FeatureProvider";
import { useStore } from "@/data/store";
import useOrganisationStore from "@/queries/useOrganisationStore";
import SroForm from "./SroForm";
import SroInvite from "./SroInvite";

export default function Sro() {
  const { isSroRequirementEnabled } = useFeatures();
  const { organisation } = useOrganisationStore();
  const user = useStore(state => state.getUser());

  const isDelegate = user?.is_delegate === 1;
  const hasSroAssigned = Boolean(organisation?.sro_officer);

  return isSroRequirementEnabled ? (
    <SroForm isDelegate={isDelegate} hasSroAssigned={hasSroAssigned} />
  ) : (
    <SroInvite hasSroAssigned={hasSroAssigned} />
  );
}
