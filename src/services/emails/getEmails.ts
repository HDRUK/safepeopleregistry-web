import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { getSearchQuerystring } from "../../utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { EmailsResponse } from "./types";

export default async (
  searchParams: Record<string, string | number | undefined>,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<EmailsResponse>>> => {
  const response = await getRequest(
    `/emails${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
