import { useFeatures } from "@/components/FeatureProvider";
import { useStore } from "@/data/store";
import { getCustodianUserQuery } from "@/services/custodian_users";
import { isCustodianViewer } from "@/utils/custodian";
import { useQuery } from "@tanstack/react-query";

// LOCAL TESTING ONLY: true previews the read-only view. Must be false when committed.
// needs BE: remove once the flag and Viewer role exist.
export const PREVIEW_VIEWER_ROLE = true;

type CustodianViewerAccess = {
  isLoading: boolean;
  isViewer: boolean;
  isViewOnly: boolean;
  isViewerDisabled: boolean;
};

// needs BE: swap in the API's own Viewer check here if it adds one.
export default function useCustodianViewerAccess(): CustodianViewerAccess {
  const { isCustodianViewerRoleEnabled } = useFeatures();
  const { user, permissions } = useStore(state => ({
    user: state.getUser(),
    permissions: state.config.permissions,
  }));

  const { data, isLoading } = useQuery({
    ...getCustodianUserQuery(user?.custodian_user_id as number),
    enabled: !!user?.custodian_user_id,
  });

  if (PREVIEW_VIEWER_ROLE) {
    return {
      isLoading: false,
      isViewer: true,
      isViewOnly: true,
      isViewerDisabled: false,
    };
  }

  const isViewer = !!data?.data && isCustodianViewer(data.data, permissions);
  const isFlagOn = !!isCustodianViewerRoleEnabled;

  return {
    isLoading,
    isViewer,
    isViewOnly: isViewer && isFlagOn,
    isViewerDisabled: isViewer && !isFlagOn,
  };
}
