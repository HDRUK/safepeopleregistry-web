import putCustodianRules, {
  PutCustodianRulesPayload,
} from "@/app/actions/rules/putCustodianRules";

export default function putCustodianRulesQuery(id?: number) {
  return {
    mutationKey: ["putCustodianRules", id],
    mutationFn: (payload: PutCustodianRulesPayload) =>
      putCustodianRules(id as number, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
