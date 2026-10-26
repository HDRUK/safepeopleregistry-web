"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { usePathname } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import LoadingWrapper from "../../components/LoadingWrapper";
import getMeQuery from "../../services/auth/getMeQuery";

type ApplicationUserProps = PropsWithChildren;

export default function ApplicationUser({ children }: ApplicationUserProps) {
  const pathname = usePathname();

  // On /register the Registry user is still being created, and Register navigates
  // away as soon as it is. A getMe server action in flight at that point is
  // forwarded by Next.js to /[locale]/register, which the i18n proxy redirects,
  // so the client throws "An unexpected response was received from the server."
  const { data: user, isLoading } = useQuery(
    getMeQuery({ enabled: pathname !== ROUTES.register.path })
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
