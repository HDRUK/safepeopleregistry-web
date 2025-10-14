import { GetSystemConfigResponse } from "@/services/system_config/types";
import { escapeAndParse } from "./json";
import { VALIDATION_SCHEMA_KEY } from "../consts/application";

function canUseIdvt(country: string | undefined) {
  return Boolean(
    country && ["United Kingdom", "UK"].find(item => item === country)
  );
}

function parseSystemConfig(data: GetSystemConfigResponse | undefined) {
  return data
    ? data.reduce(
        (accumulator, { name, value, ...restProps }) =>
          ({
            ...accumulator,
            [name]: {
              ...restProps,
              value:
                name === VALIDATION_SCHEMA_KEY
                  ? escapeAndParse(value).validationSchema
                  : value,
            },
            /* eslint-disable  @typescript-eslint/no-explicit-any */
          }) as Record<string, any>,
        {}
      )
    : {};
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function injectParamsIntoPath(
  path: string,
  params: Record<string, string | number>
) {
  let replacedPath = path;

  Object.keys(params).forEach(name => {
    replacedPath = replacedPath.replace(`{${name}}`, params[name]?.toString());
  });

  return replacedPath;
}

function getInitials(name: string): string {
  if (!name) return "";

  const ignoreWords = new Set(["of", "the", "and", "for", "in", "on", "at"]);
  const nameParts = name
    .split(" ")
    .filter(word => !ignoreWords.has(word.toLowerCase()));

  return nameParts
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}

export {
  getInitials,
  injectParamsIntoPath,
  isProduction,
  parseSystemConfig,
  canUseIdvt,
};
