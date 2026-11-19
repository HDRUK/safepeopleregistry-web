"use client";

import useUserStore from "@/queries/useUserStore";
import { notFound } from "next/navigation";
import Projects from "../Projects";
import { PageTabs } from "../../consts/tabs";
import AffiliationsPage from "../AffiliationsPage";
import DigitalIdentifiers from "../DigitalIdentifiers";
import Experience from "../Experience";
import Home from "../Home";
import Identity from "../Identity";
import Trainings from "../Trainings";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const user = useUserStore();

  if (!user) notFound();

  return (
    <>
      {tabId === PageTabs.IDENTITY && <Identity />}
      {tabId === PageTabs.DIGITAL_IDENTIFIERS && <DigitalIdentifiers />}
      {tabId === PageTabs.EXPERIENCE && <Experience />}
      {tabId === PageTabs.AFFILIATIONS && <AffiliationsPage />}
      {tabId === PageTabs.TRAINING && <Trainings />}
      {tabId === PageTabs.HOME && <Home />}
      {tabId === PageTabs.PROJECTS && <Projects />}
    </>
  );
}
