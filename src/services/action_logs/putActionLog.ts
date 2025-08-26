import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ActionLog } from "@/types/logs";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<ActionLog>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/action_log/${id}?complete`,
    {}
  );

  return handleJsonResponse(response, options);
};
