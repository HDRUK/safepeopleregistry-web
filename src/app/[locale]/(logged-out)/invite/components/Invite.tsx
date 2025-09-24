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

    if (digiIdent) {
      Cookies.set("account_digi_ident", digiIdent);
    }

    if (inviteCode) {
      Cookies.set("invite_code", inviteCode);
    }

    router.push(getRegisterUrl());
  }, [params, router]);

  return null;
}
