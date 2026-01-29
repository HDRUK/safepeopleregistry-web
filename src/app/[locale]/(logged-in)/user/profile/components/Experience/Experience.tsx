import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import Guidance from "@/components/Guidance";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import Text from "@/components/Text";
import yup from "@/config/yup";
import { FileType } from "@/consts/files";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { ROUTES } from "@/consts/router";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { mockedUserExperienceGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import FileUploadDetails from "@/modules/FileUploadDetails/FileUploadDetails";
import { putUserQuery } from "@/services/users";
import { getFileHref, getLatestCV } from "@/utils/file";
import { Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo } from "react";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export interface ExperienceFormValues {
  orc_id?: string | null;
}

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const { showAlert, hideAlert } = useAlertModal();
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);
  const router = useRouter();

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
        };

        await updateUser.mutateAsync(request);

        setUser(request);

        showAlert({
          severity: "success",
          text: tProfile("postUserSuccess"),
          confirmButtonText: tProfile("postUserSuccessButton"),
          onConfirm: async () => {
            hideAlert();

            router.push(ROUTES.profileResearcherAffiliations.path);
          },
        });
      } catch (_) {
        showAlert({
          severity: "error",
          text: <ErrorMessage t={tProfile} tKey="postUserError" />,
          confirmButtonText: tProfile("postUserErrorButton"),
          onConfirm: async () => {
            hideAlert();
          },
        });
      }
    },
    [user, updateUser, tProfile, router]
  );

  const error = updateUser.isError && (
    <ErrorMessage t={tProfile} tKey={updateUser.error} />
  );

  const formOptions = {
    defaultValues: {
      orc_id: user?.orc_id,
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
          ),
      }),
    []
  );

  return (
    <PageBodyContainer heading={tProfile("experienceTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
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
                          renderField={fieldProps => (
                            <Text sx={{ maxWidth: "100%" }}>
                              <TextField {...fieldProps} fullWidth />
                            </Text>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </FormSection>

                  <FormSection>
                    <Typography
                      variant="subtitle1"
                      component="span"
                      gutterBottom>
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
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <Guidance
            {...mockedUserExperienceGuidanceProps}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
