import { flag } from "@vercel/flags/next";
import { createAPIFlagAdapter } from "./utils/apiFlagAdapter";

const adapter = createAPIFlagAdapter()<boolean, never>();

export const isTestFeatureEnabled = flag({
  key: "test-feature",
  adapter,
});

export const isChristmasBannerEnabled = flag({
  key: "christmas-banner",
  adapter,
});

export const isTestFeatureUserAdmin = flag({
  key: "test-feature-user-admin",
  adapter,
});
