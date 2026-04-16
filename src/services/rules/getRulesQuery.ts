import getRules from "@/app/actions/rules/getRules";

export default function getCustodianRulesQuery() {
  return {
    queryKey: ["getAllRules"],
    queryFn: () =>
      getRules({
        error: {
          message: "getAllRulesError",
        },
      }),
  };
}
