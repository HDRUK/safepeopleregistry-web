import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { MutationState } from "../../types/form";
import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedPayload,
  postOrganisationUnclaimedQuery,
} from "../../services/organisations";
import { getCombinedQueryState } from "../../utils/query";

interface UseOrganisationInviteProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useOrganisationInvite({
  onSuccess,
  onError,
}: UseOrganisationInviteProps = {}) {
  const {
    mutateAsync: mutateOrganisationUnclaimed,
    reset: resetOrganisationUnclaimed,
    ...postOrganisationUnclaimedQueryState
  } = useMutation(postOrganisationUnclaimedQuery());

  const {
    mutateAsync: mutateOrganisationInvite,
    reset: resetOrganisationInvite,
    ...postOrganisationInviteQueryState
  } = useMutation(postOrganisationInviteQuery());

  const handleSubmit = useCallback(
    async (organisation: PostOrganisationUnclaimedPayload) => {
      try {
        const { data: id } = await mutateOrganisationUnclaimed(organisation);

        await mutateOrganisationInvite(id);
        onSuccess?.();
        return id;
      } catch (_) {
        onError?.();
        return undefined;
      }
    },
    []
  );

  const queryState = getCombinedQueryState<MutationState>([
    postOrganisationUnclaimedQueryState,
    postOrganisationInviteQueryState,
  ]);

  return useMemo(
    () => ({
      queryState: {
        ...queryState,
        reset: () => {
          resetOrganisationUnclaimed();
          resetOrganisationInvite();
        },
      },
      handleSubmit,
      mutateOrganisationUnclaimed,
      mutateOrganisationInvite,
    }),
    [queryState]
  );
}
