import downloadFile from "./downloadFile";

export default function downloadFileQuery(id: number | undefined) {
  return {
    queryKey: ["downloadFile"],
    queryFn: () => {
      return downloadFile(id as number);
    },
    enabled: !!id,
  };
}
