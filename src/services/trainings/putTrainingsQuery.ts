import putTrainings from "./putTrainings";
import { PutTrainingsPayload } from "./types";

export default function putTrainingsQuery(id: number) {
  return {
    mutationKey: ["putTrainingsQuery"],
    mutationFn: (payload: PutTrainingsPayload) =>
      putTrainings(id, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
