import postProfessionalRegistration from "@/app/actions/professional_registrations/postProfessionalRegistration";
import { PostProfessionalRegistrationPayload } from "./types";

export default function postProfessionalRegistrationQuery(registryId: number) {
  return {
    mutationKey: ["postProfessionalRegistration", registryId],
    mutationFn: (payload: PostProfessionalRegistrationPayload) => {
      return postProfessionalRegistration(registryId, payload, {
        error: { message: "postProfessionalRegistrationError" },
      });
    },
  };
}
