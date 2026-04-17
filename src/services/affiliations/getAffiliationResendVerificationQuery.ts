import getAffiliationResendVerification from "@/app/actions/affiliations/getAffiliationResendVerification";

export default function getAffiliationResendVerificationQuery() {
  return {
    mutationKey: ["getAffiliationResendVerification"],
    mutationFn: (id: number) => {
      return getAffiliationResendVerification(id, {
        error: { message: "getAffiliationResendVerificationError" },
      });
    },
  };
}
