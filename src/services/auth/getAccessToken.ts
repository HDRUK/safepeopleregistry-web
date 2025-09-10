import { isServer, postRequest } from "../requests";

export default async function getAccessToken(): Promise<string | undefined> {
  const response = await postRequest(
    `${isServer() ? process.env.NEXT_PUBLIC_API_SERVER_URL : process.env.NEXT_PUBLIC_API_URL}/auth/token`
  );

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return data.access_token;
}
