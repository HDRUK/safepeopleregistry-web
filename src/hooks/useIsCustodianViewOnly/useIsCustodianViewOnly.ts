import { useStore } from "@/data/store";

export default function useIsCustodianViewOnly(): boolean {
  return useStore(state => !!state.config.isCustodianViewOnly);
}
