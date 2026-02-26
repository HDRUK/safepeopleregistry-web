"use client";

import { getRegisterUrl } from "@/utils/keycloak";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Invite() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const digiIdent = params?.get("digi_ident");
    const inviteCode = params?.get("invite_code");
    const loginHint = params?.get('anotherg%40jamiebyrne.com')

    if (digiIdent) {
      Cookies.set("account_digi_ident", digiIdent);
    }

    if (inviteCode) {
      Cookies.set("invite_code", inviteCode);
    }

    router.push(getRegisterUrl(null, {loginHint}));
  }, [params, router]);

  return null;
}
