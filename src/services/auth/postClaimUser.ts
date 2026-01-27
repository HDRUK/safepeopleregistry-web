import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { isServer, postRequest } from "../requests";
import { PostRegisterResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  const response = await postRequest(
    `${isServer() ? process.env.NEXT_PUBLIC_API_SERVER_URL : process.env.NEXT_PUBLIC_API_URL}/auth/claimUser/${id}`
  );
  const json = await response.json();
  console.log("**** registering", json);

  return handleJsonResponse(response, options);
};
