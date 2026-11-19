"use client";

import AffiliationsForm from "@/app/[locale]/(logged-in)/user/profile/components/AffiliationsForm";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useSubmitAffiliation from "@/hooks/useSubmitAffiliation";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { EntityType } from "@/types/api";
import { handleLogout } from "@/utils/keycloak";
import { getOrganisationConflictErrorKey } from "@/utils/organisationConflictError";
import { renderErrorToString } from "@/utils/translations";
import { Box, Button, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const NAMESPACE_TRANSLATIONS = "AddAffiliation";
const NAMESPACE_TRANSLATIONS_PROFILE = "Profile";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export default function AddAffiliation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showAlert, hideAlert } = useAlertModal();

  const user = useStore(state => state.getUser());
  // An affiliation created by an invite, for the researcher to complete.
  const invited = user?.registration_affiliation ?? null;

  const {
    submitAffiliation,
    queryState,
    postAffiliationQueryState,
    putAffiliationQueryState,
  } = useSubmitAffiliation({
    user,
    onOrganisationInviteError: (error: unknown) => {
      const conflictErrorKey = getOrganisationConflictErrorKey(error);

      showAlert({
        severity: "error",
        text: conflictErrorKey
          ? renderErrorToString(tApplication, conflictErrorKey)
          : renderErrorToString(tProfile, "affiliationActionError"),
        confirmButtonText: tProfile("affiliationActionErrorButton"),
        onConfirm: async () => {
          hideAlert();
        },
      });
    },
  });

  const saveErrorAlert = {
    showOnlyError: true,
    errorAlertProps: {
      text: renderErrorToString(tProfile, "affiliationActionError"),
      confirmButtonText: tProfile("affiliationActionErrorButton"),
    },
  };
  useQueryAlerts(postAffiliationQueryState, saveErrorAlert);
  useQueryAlerts(putAffiliationQueryState, saveErrorAlert);

  const handleSubmit = async (fields: PostAffiliationPayload) => {
    const saved = await submitAffiliation(
      invited
        ? { ...fields, organisation_id: invited.organisation_id }
        : fields,
      invited?.id
    );

    if (!saved) return;

    await queryClient.invalidateQueries({ queryKey: ["getMe"] });
    router.refresh();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 800,
        mx: "auto",
        py: 6,
      }}>
      <Typography variant="h2">{t("title")}</Typography>
      <Typography>
        {invited?.organisation_name
          ? t("invitedDescription", {
              organisationName: invited.organisation_name,
            })
          : t("description")}
      </Typography>
      <AffiliationsForm
        entityId={user?.id}
        entityType={EntityType.USER}
        onSubmit={handleSubmit}
        queryState={queryState}
        initialValues={
          invited
            ? {
                id: invited.id,
                organisation_id: invited.organisation_id,
                email: invited.email,
              }
            : undefined
        }
        lockOrganisation={!!invited}
      />
      <Box>
        <Button variant="outlined" onClick={() => handleLogout()}>
          {t("signOut")}
        </Button>
      </Box>
    </Box>
  );
}
