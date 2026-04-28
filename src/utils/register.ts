"use server";

import { isProduction } from "@/utils/application";
import { cookies } from "next/headers";

async function setAcceptTCs(value: boolean, userGroup: string) {
  const cookieStore = await cookies();

  if (value) {
    cookieStore.set(`accepted_tcs_${userGroup}`, "true", {
      secure: isProduction(),
      httpOnly: true,
      sameSite: "lax",
    });
  } else {
    cookieStore.delete(`accepted_tcs_${userGroup}`);
  }
}

async function getAcceptedTCs(userGroup: string) {
  const cookieStore = await cookies();

  return cookieStore.get(`accepted_tcs_${userGroup}`)?.value;
}

export { setAcceptTCs, getAcceptedTCs };
