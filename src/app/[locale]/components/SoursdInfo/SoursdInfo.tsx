"use client";

import { mockedSoursdHomepageInfo } from "@/mocks/data/cms";
import { StyledContent } from "./SoursdInfo.styles";

export default function SoursdInfo() {
  return <StyledContent>{mockedSoursdHomepageInfo.info}</StyledContent>;
}
