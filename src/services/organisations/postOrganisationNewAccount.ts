import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostOrganisationNewAccountPayload } from "./types";

export default async (
  payload: PostOrganisationNewAccountPayload,
  options?: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(`/organisations/new_account`, payload);

  return handleJsonResponse(response, options);
};
