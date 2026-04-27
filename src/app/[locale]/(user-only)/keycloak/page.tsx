import { isLoggedIn } from "@/utils/auth";
import KeycloakRedirect from "./components/KeycloakRedirect";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    redirect_path: string;
  }>;
}) {
  const loggedIn = await isLoggedIn();
  const params = await searchParams

  return (
    <KeycloakRedirect
      loggedIn={loggedIn}
      redirect_uri={params.redirect_path}
    />
  );
}
