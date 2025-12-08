import { flag } from "@vercel/flags/next";
import { createAPIFlagAdapter } from "./utils/apiFlagAdapter";

const apiAdapter = createAPIFlagAdapter();

export const isTestFeatureEnabled = flag({
  key: "test-feature",
  adapter: await apiAdapter(),
});
