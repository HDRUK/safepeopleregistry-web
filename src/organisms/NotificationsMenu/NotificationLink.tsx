import { NotificationLinkType } from "@/consts/notifications";
import { ROUTES } from "@/consts/router";
import { Link } from "@/i18n/routing";
import { NotificationLink as NotificationLinkData } from "@/types/notifications";
import { injectParamsIntoPath } from "@/utils/application";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "NotificationsMenu.links";

const getHref = ({ type, id }: NotificationLinkData) => {
  switch (type) {
    case NotificationLinkType.ORGANISATION_USER:
      return injectParamsIntoPath(
        ROUTES.profileOrganisationUsersIdentity.path,
        {
          userId: id,
        }
      );
    default:
      return undefined;
  }
};

interface NotificationLinkProps {
  link: NotificationLinkData;
  onNavigate?: () => void;
}

export default function NotificationLink({
  link,
  onNavigate,
}: NotificationLinkProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const href = getHref(link);

  // A link this version of the app does not know about is left out, rather than shown broken
  if (!href) return null;

  return (
    <Button
      component={Link}
      href={href}
      size="small"
      variant="outlined"
      sx={{ alignSelf: "flex-start", mt: 0.5 }}
      onClick={(e: React.MouseEvent) => {
        // Following the link should not also open the notification
        e.stopPropagation();
        onNavigate?.();
      }}>
      {t(link.type)}
    </Button>
  );
}
