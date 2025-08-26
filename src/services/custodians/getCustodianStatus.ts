import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianStatusResponse } from "./types";

export default async (
  custodianId: number,
  projectUserId: number,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianStatusResponse>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/projectUsers/${projectUserId}/statuses`
  );

  return handleJsonResponse(response, options);
};
