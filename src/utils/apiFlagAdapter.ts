import type { Adapter } from "@vercel/flags";

const { NEXT_PUBLIC_API_V1_SERVER_URL, isTest } = process.env;


console.log(typeof window === "undefined", '>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<')
console.log(fetch)

let cache: Record<string, boolean> | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL_MS = isTest === "true" ? 0 : 5 * 60 * 1000;

interface Feature {
  id: number;
  name: string;
  value: string;
  scope: string | null;
  description: string;
}

interface FeatureFlagsResponse {
  message: string;
  data: {
    data: Feature[];
  };
}

const flattenFlags = (
  response: FeatureFlagsResponse
): Record<string, boolean> => {
  const flags: Record<string, boolean> = {};
  response.data.data.forEach(feature => {
    flags[feature.name] = feature.value === "true";
  });
  return flags;
};

const setCache = async (): Promise<Record<string, boolean>> => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_V1_SERVER_URL}/features`);
    if (!res.ok) {
      console.error(`Failed to fetch feature flags: ${res.statusText}`);
      return {};
    }

    const json: FeatureFlagsResponse = await res.json();
    cacheTimestamp = Date.now();
    return flattenFlags(json);
  } catch (err) {
    console.error(
      "Error fetching feature flags, will retry after cache is stale",
      err
    );
    cacheTimestamp = Date.now();
    return {};
  }
};

const isCacheStale = () => {
  if (!cacheTimestamp) return true;
  return Date.now() - cacheTimestamp > CACHE_TTL_MS;
};

export function createAPIFlagAdapter() {
  return function apiFlagAdapter<ValueType, EntitiesType>(): Adapter<
    ValueType,
    EntitiesType
  > {
    return {
      async decide({ key }): Promise<ValueType> {
        if (!cache || isCacheStale()) {
          cache = await setCache();
        }
        return (cache[key] as ValueType) ?? (false as ValueType);
      },
    };
  };
}
