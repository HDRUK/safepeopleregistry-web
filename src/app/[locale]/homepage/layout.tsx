import { redirectApplication } from "@/utils/headers";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await redirectApplication();

  return children;
}
