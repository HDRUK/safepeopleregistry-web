import getFile from "@/app/actions/files/getFile";

export default function getFileQuery(id: number | undefined) {
  return {
    queryKey: ["getFile"],
    queryFn: () => {
      return getFile(id, {
        error: { message: "getFileFailed" },
      });
    },
    enabled: !!id,
  };
}
