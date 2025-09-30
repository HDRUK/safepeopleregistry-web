import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";

export default async (
  verificationCode: string,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await putRequest(
    `/affiliations/verify_email/${verificationCode}`
  );

  return handleJsonResponse(response, options);
};
