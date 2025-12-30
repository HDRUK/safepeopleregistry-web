import applicationRedirects from "@/utils/applicationRedirects";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await applicationRedirects();

  return children;
}
