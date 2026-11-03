"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { usePathname } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import LoadingWrapper from "../../components/LoadingWrapper";
import getMeQuery from "../../services/auth/getMeQuery";

type ApplicationUserProps = PropsWithChildren;

export default function ApplicationUser({ children }: ApplicationUserProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // On /register?type=... Register creates the Registry user and navigates away
  // as soon as it is done. A getMe server action in flight at that point is
  // forwarded by Next.js to /[locale]/register, which the i18n proxy redirects,
  // so the client throws "An unexpected response was received from the server."
  const isAutoRegistering =
    pathname === ROUTES.register.path && searchParams.has("type");

  const { data: user, isLoading } = useQuery(
    getMeQuery({ enabled: !isAutoRegistering })
  );
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    if (user?.data) {
      setUser(user.data);
    } else {
      setUser({});
    }
  }, [user?.data]);

  return (
    <LoadingWrapper loading={isLoading} variant="basic">
      {children}
    </LoadingWrapper>
  );
}
