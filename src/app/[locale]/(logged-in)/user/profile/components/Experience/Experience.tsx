import FormSection from "@/components/FormSection";
import { FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { mockedUserExperienceGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { getFileHref, getLatestCV } from "@/utils/file";
import { Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useCallback, useMemo } from "react";
import FormControl from "@/components/FormControlWrapper";
import Form from "@/components/Form";
import { useMutation } from "@tanstack/react-query";
import { putUserQuery } from "@/services/users";
import { showAlert } from "@/utils/showAlert";
import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { VALIDATION_ORC_ID } from "@/consts/form";
import Text from "@/components/Text";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FileUploadDetails from "@/modules/FileUploadDetails/FileUploadDetails";
import ErrorMessage from "@/components/ErrorMessage";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export interface ExperienceFormValues {
  orc_id?: string | null;
  consent_scrape?: boolean;
}
export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);
  const router = useRouter();
  const [consentScrape, setConsentScrape] = useState(
    user?.consent_scrape || false
  );

  const latestCV = getLatestCV(user?.registry?.files || []);

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload("cvUpload", { initialFileId: latestCV?.id });

  const uploadFile = useUserFileUpload({
    user,
    fileType: FileType.CV,
    upload,
  });

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const updatedUser = await uploadFile(e);
      if (updatedUser) setUser(updatedUser);
    },
    []
  );

  const updateUser = useMutation(putUserQuery(user?.id));

  const handleDetailsSubmit = useCallback(
    async (fields: ExperienceFormValues) => {
      try {
        const request = {
          ...user,
          orc_id: fields.orc_id,
          consent_scrape: consentScrape,
        };
        await updateUser.mutateAsync(request);
        setUser(request);
        showAlert("success", {
          text: tProfile("postUserSuccess"),
          confirmButtonText: tProfile("postUserSuccessButton"),
          preConfirm: () => {
            router.push(ROUTES.profileResearcherAffiliations.path);
          },
        });
      } catch (_) {
        showAlert("error", {
          text: <ErrorMessage t={tProfile} tKey="postUserError" />,
          confirmButtonText: tProfile("postUserErrorButton"),
        });
      }
    },
    [user, consentScrape, updateUser, tProfile, router]
  );

  const error = updateUser.isError && (
    <ErrorMessage t={tProfile} tKey={updateUser.error} />
  );

  const handleConsentScrapeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConsentScrape(event.target.checked);
    },
    []
  );
  const formOptions = {
    defaultValues: {
      orc_id: user?.orc_id,
      consent_scrape: consentScrape,
    },
    error,
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        orc_id: yup
          .string()
          .nullable()
          .matches(
            new RegExp(`(${VALIDATION_ORC_ID.source})|^$`),
            tForm("orcIdFormatInvalid")
          )
          .when("consent_scrape", {
            is: true,
            then: () =>
              yup
                .string()
                .required(tForm("orcIdRequiredInvalid"))
                .matches(VALIDATION_ORC_ID, tForm("orcIdFormatInvalid")),
          }),
        consent_scrape: yup.boolean().defined(),
      }),
    []
  );

  return (
    <PageBodyContainer heading={tProfile("experienceTitle")}>
      <PageGuidance {...mockedUserExperienceGuidanceProps}>
        <PageBody>
          <PageSection
            heading={tProfile("employmentEducationPublicationRecord")}>
            <Form
              onSubmit={handleDetailsSubmit}
              {...formOptions}
              schema={schema}
              key={user?.id}
              canLeave>
              <>
                <FormSection description={tProfile("orcidDescription")}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl
                        name="orc_id"
                        label="ORCID"
                        description={tProfile("orcidFormDescription")}
                        renderField={fieldProps => (
                          <Text sx={{ maxWidth: "100%" }}>
                            <TextField {...fieldProps} fullWidth />
                          </Text>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlCheckbox
                        name="consent_scrape"
                        color="primary"
                        onChange={handleConsentScrapeChange}
                        checked={consentScrape}
                        label={tForm("consentScrapeDescription")}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                <FormSection>
                  <Typography variant="subtitle1" gutterBottom>
                    {tProfile("cvUpload")}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FileUploadDetails
                        fileButtonText={tProfile("cvUpload")}
                        fileHref={getFileHref(latestCV?.name)}
                        fileType={FileType.CV}
                        fileNameText={file?.name || tProfile("noCvUploaded")}
                        isSizeInvalid={isSizeInvalid}
                        isScanning={isScanning}
                        isScanComplete={isScanComplete}
                        isScanFailed={isScanFailed}
                        isUploading={isUploading}
                        onFileChange={handleFileChange}
                        message="cvUploadFailed"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "textSecondary.main", pt: 1 }}>
                      {tProfile("cvUploadDescription")}
                    </Typography>
                  </Grid>
                </FormSection>

                <FormActions>
                  <ProfileNavigationFooter
                    previousHref={ROUTES.profileResearcherIdentity.path}
                    nextStepText={tProfile("affiliations")}
                    isLoading={updateUser.isPending}
                  />
                </FormActions>
              </>
            </Form>
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
