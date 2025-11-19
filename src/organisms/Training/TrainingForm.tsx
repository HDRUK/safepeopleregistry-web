import { useStore } from "@/data/store";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import ButtonSave from "../../components/ButtonSave";
import DateInput from "../../components/DateInput";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControl from "../../components/FormControlWrapper";
import yup from "../../config/yup";
import { FileType } from "../../consts/files";
import useFileUpload from "../../hooks/useFileUpload";
import useUserFileUpload from "../../hooks/useUserFileUpload";
import FileUploadDetails from "../../modules/FileUploadDetails/FileUploadDetails";
import { PostTrainingsPayload } from "../../services/trainings/types";

import {
  File as ApplicationFile,
  ResearcherTraining,
} from "../../types/application";
import { formatDBDateTime, getDate } from "../../utils/date";

const NAMESPACE_TRANSLATION_FORM = "Form.Training";
const NAMESPACE_TRANSLATION_FILE_UPLOAD = "Certification";

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
  certification_upload?: ApplicationFile;
}
interface TrainingFormProps {
  onSubmit: (values: PostTrainingsPayload) => void;
  isPending: boolean;
  onCancel: () => void;
  initialValues?: ResearcherTraining;
}

export default function TrainingForm({
  onSubmit,
  isPending,
  onCancel,
  initialValues,
}: TrainingFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tUpload = useTranslations(NAMESPACE_TRANSLATION_FILE_UPLOAD);
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const calculateYearsRemaining = (expirationDate: string): number => {
    const now = dayjs();
    const expiration = dayjs(expirationDate);
    if (!expiration.isValid() || expiration.isBefore(now)) {
      return 0;
    }
    return expiration.diff(now, "year", true);
  };

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload("certificationUploadFailed", {
    initialFileId: initialValues?.certification_id,
  });

  const { setValue } = useForm();

  useEffect(() => {
    if (file) {
      setValue("certification_upload", file);
    }
  }, [file, setValue]);

  const uploadFile = useUserFileUpload({
    user,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const updatedUser = await uploadFile(e);
        if (updatedUser) {
          setUser(updatedUser);
          setValue("certification_upload", file);
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    },
    [user?.registry_id, uploadFile, setUser, setValue, file]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        provider: yup
          .string()
          .required(tForm("trainingProviderRequiredInvalid")),
        training_name: yup
          .string()
          .required(tForm("trainingNameRequiredInvalid")),
        awarded_at: yup
          .string()
          .required(tForm("awardedAtRequiredInvalid"))
          .test("not-future", tForm("awardedAtFutureInvalid"), value => {
            return (
              dayjs(value).isBefore(dayjs()) ||
              dayjs(value).isSame(dayjs(), "day")
            );
          }),
        expires_at: yup
          .string()
          .required(tForm("expiresAtRequiredInvalid"))
          .test(
            "after-awarded",
            tForm("expiresAtBeforeAwardedAtInvalid"),
            (value, context) => {
              const { awarded_at } = context.parent;
              return dayjs(value).isAfter(dayjs(awarded_at));
            }
          )
          .test("is-future", tForm("expiresAtPastInvalid"), value => {
            return dayjs(value).isAfter(dayjs());
          }),
        certification_upload: yup.mixed(),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      provider: initialValues?.provider || "",
      training_name: initialValues?.training_name || "",
      awarded_at: getDate(initialValues?.awarded_at) || "",
      expires_at: getDate(initialValues?.expires_at) || "",
    },
  };

  const handleSubmit = (fields: TrainingFormValues) => {
    const yearsRemaining = calculateYearsRemaining(fields.expires_at);
    const formattedFields = {
      ...fields,
      awarded_at: formatDBDateTime(fields.awarded_at),
      expires_at: formatDBDateTime(fields.expires_at),
      expires_in_years: yearsRemaining,
      certification_id: file?.id ?? null,
    };
    onSubmit(formattedFields);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      key={user?.id}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12} key="provider">
          <FormControl
            name="provider"
            label={tForm("provider")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={12} key="training_name">
          <FormControl
            name="training_name"
            label={tForm("trainingName")}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={7} key="awarded_at">
          <FormControl
            name="awarded_at"
            label={tForm("awardedAt")}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
        <Grid item xs={7} key="expires_at">
          <FormControl
            name="expires_at"
            label={tForm("expiresAt")}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
        <Grid item xs={12} key="certification_upload">
          <FormControl
            name="certification_upload"
            label={tForm("certificationUpload")}
            renderField={() => (
              <>
                <Typography variant="body2" gutterBottom>
                  {tForm("uploadInstructions")}
                </Typography>
                <Divider sx={{ mb: 2, backgroundColor: "grey" }} />
                <Typography variant="subtitle1" gutterBottom>
                  {tForm("fileUpload")}
                </Typography>
                <FileUploadDetails
                  fileButtonText={tForm("uploadCertification")}
                  fileType={FileType.CERTIFICATION}
                  fileTypesText={tUpload("fileTypesText")}
                  fileNameText={file?.name || tForm("noCertificationUploaded")}
                  isSizeInvalid={isSizeInvalid}
                  isScanning={isScanning}
                  isScanComplete={isScanComplete}
                  isScanFailed={isScanFailed}
                  isUploading={isUploading}
                  onFileChange={handleFileUpload}
                  message="certificationUploadFailed"
                />

                {!file && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, color: "text.secondary" }}>
                    {tUpload("noFilesUploaded")}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>
      </Grid>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onCancel} variant="outlined">
          {tForm("cancel")}
        </Button>
        <ButtonSave type="submit" disabled={isPending} />
      </FormActions>
    </Form>
  );
}
