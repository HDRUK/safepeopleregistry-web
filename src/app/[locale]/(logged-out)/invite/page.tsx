import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Invite from "./components";

export const metadata: Metadata = {
  title: `Accept Invitation | ${SITE_NAME}`,
  description:
    "Accept your invitation to join Safe People Registry and get started with streamlined 'safe people' validations.",
};

export default function Page() {
  return <Invite />;
}
