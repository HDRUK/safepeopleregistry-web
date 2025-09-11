import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, isServer } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { MeResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<MeResponse>> => {
  const response = await getRequest(
    `${isServer() ? process.env.NEXT_PUBLIC_API_SERVER_URL : process.env.NEXT_PUBLIC_API_URL}/auth/me_unclaimed`
  );

  return handleJsonResponse(response, options);
};
