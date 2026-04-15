import postFile from "@/app/actions/files/postFile";
import { FilePayload } from "./types";

export default function postFileQuery(message: string) {
  return {
    mutationKey: ["postFile"],
    mutationFn: (payload: FilePayload) => {
      return postFile(payload, {
        error: { message },
      });
    },
  };
}
