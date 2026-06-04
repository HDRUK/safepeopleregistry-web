import { UserGroup } from "@/consts/user";

export type CardHrefs = {
  loggedOut: string;
  [UserGroup.USERS]?: string;
  [UserGroup.ORGANISATIONS]?: string;
  [UserGroup.CUSTODIANS]?: string;
};

export type CardConfig = {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey?: string;
  ctaLabelKey?: string;
  href?: string;
  hrefs?: CardHrefs;
};

export const resolveHref = (
  card: CardConfig,
  userGroup?: UserGroup
): string => {
  if (card.hrefs) {
    if (userGroup && userGroup in card.hrefs) {
      return (
        (card.hrefs as Record<string, string>)[userGroup] ??
        card.hrefs.loggedOut
      );
    }
    return card.hrefs.loggedOut;
  }
  return card.href ?? "";
};
