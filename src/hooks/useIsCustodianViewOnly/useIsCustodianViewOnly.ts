import useCustodianViewerAccess from "@/hooks/useCustodianViewerAccess";

export default function useIsCustodianViewOnly(): boolean {
  return useCustodianViewerAccess().isViewOnly;
}
