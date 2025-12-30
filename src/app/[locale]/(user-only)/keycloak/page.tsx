import { isLoggedIn } from "@/utils/auth";
import KeycloakRedirect from "./components/KeycloakRedirect";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    redirect_uri: string;
  };
}) {
  const loggedIn = await isLoggedIn();

  return (
    <KeycloakRedirect
      loggedIn={loggedIn}
      redirect_uri={searchParams.redirect_uri}
    />
  );
}
