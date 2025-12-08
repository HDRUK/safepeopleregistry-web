import { FeatureFlags } from "@/types/features";
import { Paged } from "@/types/requests";
type PostFeatureFlagsQueryPayload={
    value: boolean
}
type FeatureFlagsResponse = Paged<FeatureFlags[]>;
export type { FeatureFlagsResponse, PostFeatureFlagsQueryPayload };
