"use client";

import { useState, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { handleLogin } from "@/utils/keycloak";
import lookupSsoDomain from "@/app/actions/sso_tenants/lookupSsoDomain";
import { useRouter } from "@/i18n/routing";

const NAMESPACE_TRANSLATIONS_SIGN_IN = "SignIn";

export default function SignInEmailForm() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_SIGN_IN);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await lookupSsoDomain(email);

      if (data?.matched && data?.idp_alias) {
        router.push(
          `/keycloak?redirect_path=/&kc_idp_hint=${encodeURIComponent(data.idp_alias)}`
        );
        return;
      }
    } catch {
      // Fall through to the normal login flow below - a failed lookup
      // should never block someone from signing in the usual way.
    }

    handleLogin();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 420, mx: "auto", mt: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t("title")}
      </Typography>
      <Typography sx={{ mb: 3 }}>{t("description")}</Typography>
      <TextField
        type="email"
        label={t("emailLabel")}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}>
        {t("continueButton")}
      </Button>
    </Box>
  );
}
