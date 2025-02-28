import getCustodianRules from "./getCustodianRules";

export default function getCustodianRulesQuery(id?: number) {
  return {
    queryKey: ["getCustodianRules", id],
    queryFn: ({ queryKey }) =>
      getCustodianRules(queryKey[1] as number, {
        error: {
          message: "getCustodianRulesError",
        },
      }),
  };
}
