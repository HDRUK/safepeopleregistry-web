import NavBar from "@/organisms/NavBar";
import { isLoggedIn } from "@/utils/auth";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadElement>,
  HTMLHeadElement
>;

export default async function Header(props: HeaderProps) {
  const loggedIn = await isLoggedIn();

  return (
    <header {...props}>
      <NavBar loggedIn={loggedIn} />
    </header>
  );
}
