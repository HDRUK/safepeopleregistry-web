import postTrainings from "@/app/actions/trainings/postTrainings";
import { PostTrainingsPayload } from "./types";

export default function postTrainingsQuery(registryId: number) {
  return {
    mutationKey: ["postTrainings", registryId],
    mutationFn: (payload: PostTrainingsPayload) => {
      return postTrainings(registryId, payload, {
        error: { message: "postTrainingError" },
      });
    },
  };
}
