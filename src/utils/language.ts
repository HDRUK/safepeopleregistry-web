"use server";

import { cookies } from "next/headers";

async function getLocale(): Promise<string> {
  return (await cookies()).get("NEXT_LOCALE")?.value || "en";
}

export { getLocale };
