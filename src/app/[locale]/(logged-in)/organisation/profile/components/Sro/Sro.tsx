"use client";

import { useFeatures } from "@/components/FeatureProvider";
import SroForm from "./SroForm";
import SroInvite from "./SroInvite";

export default function Sro() {
  const { isSroRequirementEnabled } = useFeatures();

  return isSroRequirementEnabled ? <SroForm /> : <SroInvite />;
}
