import { FeatureFlags } from "@/types/features";
import { Paged } from "@/types/requests";

type FeatureFlagsResponse = Paged<FeatureFlags[]>;
export type { FeatureFlagsResponse };
