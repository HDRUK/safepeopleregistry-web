import { File as ApplicationFile } from "@/types/application";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import { MAX_UPLOAD_SIZE_BYTES } from "../../consts/files";
import getFileQuery from "../../services/files/getFileQuery";
import postFileQuery from "../../services/files/postFileQuery";
import {
  getFileHref,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
} from "../../utils/file";
import useQueryAlerts from "../useQueryAlerts";
import useQueryRefetch from "../useQueryRefetch";

export interface FileUploadState {
  isScanning: boolean;
  isScanComplete: boolean;
  isScanFailed: boolean;
  message: string;
}

interface UseFileUploadOptions {
  initialFileId?: number;
}

export default function useFileUpload(
  message: string,
  options?: UseFileUploadOptions
) {
  const [file, setFile] = useState<ApplicationFile>();

  const fileId = file?.id || options?.initialFileId;
  const { data: fileData } = useQuery({
    ...getFileQuery(fileId),
    queryKey: [`getFile${message}`],
    enabled: !!fileId,
  });

  useEffect(() => {
    if (fileData?.data) {
      setFile(fileData?.data);
    }
  }, [fileData]);

  const { refetch: refetchFile, cancel: refetchFileCancel } = useQueryRefetch({
    options: { queryKey: [`getFile${message}`] },
  });

  const [isSizeInvalid, setIsSizeInvalid] = useState<boolean>();

  const postFileState = useMutation(postFileQuery(message));

  const [isUploading, setIsUploading] = useState(false);

  useQueryAlerts(postFileState, {
    commonAlertProps: {
      onConfirm: async () => {
        postFileState.reset();
      },
    },
  });

  const upload = useCallback(
    async (formData: FormData) => {
      setIsSizeInvalid(false);
      setIsUploading(true);

      const file = formData.get("file") as File;

      if (file.size <= MAX_UPLOAD_SIZE_BYTES) {
        const { data } = await postFileState.mutateAsync(formData);

        setFile(data);
        setIsUploading(false);
        return data;
      }

      setIsSizeInvalid(true);
      setIsUploading(false);
      return null;
    },
    [fileId, fileData]
  );

  useEffect(() => {
    const isScanning = isFileScanning(file);
    if (file?.id && (!file || isScanning)) {
      refetchFile();
    } else if (file) {
      refetchFileCancel();
    }

    return () => {
      refetchFileCancel();
    };
  }, [file?.id, file]);

  return {
    upload,
    isScanning: isFileScanning(file),
    isScanComplete: isFileScanComplete(file),
    isScanFailed: isFileScanFailed(file),
    isSizeInvalid,
    isUploading,
    fileHref: getFileHref(file),
    file,
  };
}
