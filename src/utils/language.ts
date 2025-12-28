"use server";

import { cookies } from "next/headers";

async function getLocale(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore.get("NEXT_LOCALE")?.value || "en";
}

export { getLocale };
