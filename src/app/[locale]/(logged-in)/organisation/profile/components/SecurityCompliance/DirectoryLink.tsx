import { Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useWatch, useFormContext } from "react-hook-form";

const NAMESPACE_TRANSLATION = "Form";
const DIRECTORY_LINK = "DirectoryLink";

export default function DirectoryLink({
  baseUrl,
  fieldName,
}: {
  baseUrl: string;
  fieldName: string;
}) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tKey = `${fieldName?.replace(/_([a-zA-Z0-9])/g, g => g[1].toUpperCase())}${DIRECTORY_LINK}`;

  const { control } = useFormContext();
  const certNum = useWatch({ control, name: fieldName }) as string | undefined;

  const trimmed = (certNum ?? "").trim();

  const href = trimmed ? `${baseUrl}${encodeURIComponent(trimmed)}` : baseUrl;

  if (!certNum) {
    return null;
  }

  return (
    <Typography variant="body2" sx={{ mt: 1 }}>
      {t.rich(tKey, {
        link: chunks => (
          <Link href={href} target="_blank" rel="noreferrer">
            {chunks}
          </Link>
        ),
      })}
    </Typography>
  );
}
