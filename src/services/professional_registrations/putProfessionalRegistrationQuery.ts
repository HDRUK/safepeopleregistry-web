import putProfessionalRegistration from "@/app/actions/professional_registrations/putProfessionalRegistration";
import { ResearcherProfessionalRegistration } from "@/types/application";

export default function putProfessionalRegistrationQuery(registryId: number) {
  return {
    mutationKey: ["putProfessionalRegistration", registryId],
    mutationFn: (payload: ResearcherProfessionalRegistration) => {
      return putProfessionalRegistration(payload.id, payload, {
        error: { message: "putProfessionalRegistrationError" },
      });
    },
  };
}
