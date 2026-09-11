import unlinkIdentity from "@/app/actions/identities/unlinkIdentity";

export default function unlinkIdentityQuery() {
  return {
    mutationKey: ["unlinkIdentityQuery"],
    mutationFn: (provider: string) =>
      unlinkIdentity(provider, {
        error: { message: "unlinkIdentityError" },
      }),
  };
}
