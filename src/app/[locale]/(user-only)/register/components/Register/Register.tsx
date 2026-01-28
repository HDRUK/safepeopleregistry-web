"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { UserGroup } from "@/consts/user";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";
import { getAcceptedTCs } from "@/utils/register";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { registerOrganisation, registerUser } from "../../actions";
import AccountConfirm from "../AccountConfirm";

interface AccountConfirmProps {
  unclaimedUser: User | undefined;
  tokenUser: Partial<User>;
  searchParams: { type?: UserGroup };
}

export default function Register({
  unclaimedUser,
  tokenUser,
  searchParams,
}: AccountConfirmProps) {
  const autoRegister = tokenUser && searchParams?.type && !unclaimedUser;
  const [isLoading, setIsLoading] = useState(autoRegister);
  const [isRedirecting, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function completeRegistration() {
      if (tokenUser && searchParams?.type && !unclaimedUser) {
        const tcs = await getAcceptedTCs(searchParams.type);

        if (tcs === "true") {
          if (searchParams.type === UserGroup.ORGANISATIONS) {
            await registerOrganisation(tokenUser);
          } else if (searchParams.type === UserGroup.USERS) {
            await registerUser();
          }
        }

        startTransition(() => {
          router.push(getProfilePathByEntity(searchParams.type));
        });
      }

      setIsLoading(false);
    }

    completeRegistration();
  }, []);

  return (
    <LoadingWrapper variant="basic" loading={isLoading || isRedirecting}>
      <AccountConfirm unclaimedUser={unclaimedUser} />
    </LoadingWrapper>
  );
}
