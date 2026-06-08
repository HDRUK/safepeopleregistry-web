import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageContainer } from "@/modules";
import Glossary from "./components/Glossary";

export const metadata: Metadata = {
  title: `Glossary | ${SITE_NAME}`,
  description:
    "Definitions of key terms used across the Safe People Registry, including researcher roles and data governance concepts.",
};

export default function Page() {
  return (
    <PageContainer>
      <Glossary />
    </PageContainer>
  );
}
