import { ChangeEvent } from "react";
import { FileStatus, FileType } from "../consts/files";
import { FileResponse } from "../services/files/types";
import { File } from "../types/application";

function getLatestCV(files: FileResponse[] | undefined) {
  return [...(files || [])].reverse().find(file => file.type === FileType.CV);
}

function getUploadedCertification(files: FileResponse[] | undefined) {
  return [...(files || [])]
    .reverse()
    .find(file => file.type === FileType.CERTIFICATION);
}

// Ordered by upload time rather than updated_at, which changes when a scan
// finishes. Ids break ties as timestamps are only accurate to the second.
function isUploadedAfter(a: FileResponse, b: FileResponse) {
  const difference = Date.parse(a.created_at) - Date.parse(b.created_at);

  return difference === 0 ? a.id > b.id : difference > 0;
}

function getLatestSRODeclaration(files: FileResponse[] | undefined) {
  return (files || []).reduce<FileResponse | undefined>(
    (latest, file) =>
      file.type === FileType.DECLARATION_SRO &&
      (!latest || isUploadedAfter(file, latest))
        ? file
        : latest,
    undefined
  );
}

function isFileScanning(file: FileResponse | undefined) {
  return file?.status === FileStatus.PENDING;
}

function isFileScanComplete(file: FileResponse | undefined) {
  return file?.status === FileStatus.PROCESSED;
}

function isFileScanFailed(file: FileResponse | undefined) {
  return file?.status === FileStatus.FAILED;
}

function getFileHref(file: File | undefined) {
  if (!file) return "";
  const path = `${process.env.NEXT_PUBLIC_API_V1_URL}/files`;
  return `${path}/${file.id}/download`;
}

function getFileExtension(file: File) {
  return file.name.split(".").pop()?.toLowerCase();
}

function getAcceptAttribute(extensions: string[]) {
  return extensions.map(extension => `.${extension.toLowerCase()}`).join(",");
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
}

const getFileFromEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target.files && target?.files?.length) {
    return target.files[0];
  }

  return null;
};

const resetFileFromEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target && target.files && target.files.length > 0) {
    target.value = "";
  }
};

export {
  getAcceptAttribute,
  getFileExtension,
  getFileFromEvent,
  getFileHref,
  getLatestCV,
  getUploadedCertification,
  getLatestSRODeclaration,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
  resetFileFromEvent,
  downloadBlob,
};
