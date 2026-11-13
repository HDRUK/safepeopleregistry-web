import { useStore } from "@/data/store";
// LOCAL TESTING ONLY: revert this file before committing.
import { PREVIEW_VIEWER_ROLE } from "@/hooks/useCustodianViewerAccess/useCustodianViewerAccess";
import { getCustodianUserQuery } from "@/services/custodian_users";
import { isCustodianAdministrator } from "@/utils/custodian";
import { useQuery } from "@tanstack/react-query";

export default function useIsCustodianAdmin() {
  const { user, permissions } = useStore(state => ({
    user: state.getUser(),
    permissions: state.config.permissions,
  }));

  const { data } = useQuery({
    ...getCustodianUserQuery(user?.custodian_user_id as number),
    enabled: !!user?.custodian_user_id,
  });

  // LOCAL TESTING ONLY: a previewed Viewer is never an admin.
  if (PREVIEW_VIEWER_ROLE) return false;

  return data?.data ? isCustodianAdministrator(data?.data, permissions) : false;
}
