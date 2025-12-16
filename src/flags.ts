import { flag } from "@vercel/flags/next";
import { createAPIFlagAdapter } from "./utils/apiFlagAdapter";

const apiAdapter = createAPIFlagAdapter();

export const isTestFeatureEnabled = flag({
  key: "test-feature",
  adapter: await apiAdapter(),
});

export const isTestFeatureUserAdmin = flag({
  key: "test-feature-user-admin",
  adapter: await apiAdapter(),
});

export const isSponsorship = flag({
  key: "sponsorship",
  adapter: await apiAdapter(),
});
