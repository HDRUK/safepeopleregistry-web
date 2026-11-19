"use client";

import ContactLink from "@/components/ContactLink";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { getAffiliationResendVerificationQuery } from "@/services/affiliations";
import { RegistrationAffiliation } from "@/types/application";
import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "AddAffiliation";
const NAMESPACE_TRANSLATIONS_PROFILE = "Profile";

interface CheckYourEmailProps {
  affiliation: RegistrationAffiliation;
}

export default function CheckYourEmail({ affiliation }: CheckYourEmailProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const { mutateAsync: resendVerification, ...resendQueryState } = useMutation(
    getAffiliationResendVerificationQuery()
  );

  useQueryAlerts(resendQueryState, {
    successAlertProps: {
      text: tProfile("resendAffiliationSuccess"),
    },
    errorAlertProps: {
      text: tProfile("resendAffiliationError"),
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h2">
        {tProfile("affiliationActionVerificationTitle")}
      </Typography>
      <Typography>
        {tProfile("postAffiliationVerification", { email: affiliation.email })}
      </Typography>
      <Typography>
        {t.rich("checkEmailHelp", { contactLink: ContactLink })}
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={() => resendVerification(affiliation.id)}>
          {tProfile("resendVerification")}
        </Button>
      </Box>
    </Box>
  );
}
