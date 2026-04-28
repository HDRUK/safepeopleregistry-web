"use client";

import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import UploadIcon from "@mui/icons-material/Upload";
import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  Typography,
  Grid,
  Tooltip,
  Link,
} from "@mui/material";
import { useTranslations } from "next-intl";
import prettyBytes from "pretty-bytes";
import { ChangeEventHandler, ReactNode, useCallback, useRef } from "react";
import { FileUploadState } from "../../hooks/useFileUpload";
import { MAX_UPLOAD_SIZE_BYTES } from "../../consts/files";
import Text from "../Text";

export interface FileLinkProps extends FileUploadState {
  fileButtonText: ReactNode;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onDownload?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  accept?: string;
  fileScanOkText?: string;
  fileScanErrorText?: string;
  fileScanningText?: string;
  fileMaxSizeText?: ReactNode;
  fileMaxSizeErrorText?: ReactNode;
  fileTypesText?: ReactNode;
  fileNameText?: ReactNode;
  fileInputLabelText?: string;
  isUploading?: boolean;
  includeStatus?: boolean;
  isSizeInvalid?: boolean;
}

const NAMESPACE_TRANSLATION_FILE = "File";

export default function FileLink({
  accept,
  fileScanOkText,
  fileScanErrorText,
  fileScanningText,
  fileButtonText,
  fileMaxSizeText,
  fileMaxSizeErrorText,
  fileTypesText,
  fileNameText,
  fileInputLabelText,
  isScanning,
  isScanComplete,
  isScanFailed,
  isUploading,
  isSizeInvalid,
  includeStatus,
  onFileChange,
  onDownload,
}: FileLinkProps) {
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations(NAMESPACE_TRANSLATION_FILE);
  const translationsMaxSize = {
    size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
  };

  const handleFileSelectorOpen = useCallback(() => {
    ref.current?.click();
  }, []);

  const statusIcons = (
    <>
      {isScanComplete && (
        <Tooltip title={fileScanOkText || t("scanOkText")}>
          <GppGoodIcon color="success" />
        </Tooltip>
      )}
      {isScanFailed && (
        <Tooltip title={fileScanErrorText || t("scanErrorText")}>
          <GppBadIcon color="error" />
        </Tooltip>
      )}
      {isScanning && (
        <Tooltip title={fileScanningText || t("scanningText")}>
          <CircularProgress color="info" size="1em" role="progressbar" />
        </Tooltip>
      )}
    </>
  );

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 10 }}>
        <LoadingButton
          color="primary"
          variant="outlined"
          data-testid="upload-file"
          onClick={handleFileSelectorOpen}
          startIcon={<UploadIcon />}
          loading={isUploading && !isScanning}
          sx={{
            whiteSpace: "nowrap",
          }}>
          {fileButtonText}
        </LoadingButton>
      </Grid>
      <Grid size={{ xs: 12 }}>
        {fileNameText && (
          <Link
            data-testid="download-file"
            variant="body2"
            component="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onDownload?.(e);
            }}
            disabled={!onDownload}>
            {includeStatus ? (
              <Text endIcon={statusIcons}>{fileNameText}</Text>
            ) : (
              fileNameText
            )}
          </Link>
        )}
        <Typography variant="small" color="textSecondary.main" component="div">
          {fileTypesText || t("fileTypesText")}
          {". "}
          {fileMaxSizeText || t("maxSizeText", translationsMaxSize)}
        </Typography>
        {isSizeInvalid &&
          (fileMaxSizeErrorText || t("maxSizeErrorText", translationsMaxSize))}
      </Grid>
      <input
        id="fileInput"
        type="file"
        aria-label={fileInputLabelText || t("inputLabelText")}
        style={{ display: "none" }}
        ref={ref}
        onChange={onFileChange}
        accept={accept}
      />
    </Grid>
  );
}
