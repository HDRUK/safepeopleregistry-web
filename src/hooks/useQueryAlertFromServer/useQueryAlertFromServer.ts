import { useState } from "react";
import { QueryState } from "../../types/form";
import useQueryAlerts, { QueryAlertOptions } from "../useQueryAlerts";

export default function useQueryAlertFromServer(
  queryState: QueryState,
  alertOptions: QueryAlertOptions
) {
  console.log("In hook query state", queryState);
  const [verifyQueryState, setVerifyQueryState] = useState(queryState);

  console.log("Set query state", verifyQueryState);

  useQueryAlerts(verifyQueryState, {
    ...alertOptions,
    commonAlertProps: {
      ...alertOptions.commonAlertProps,
      willClose: () => {
        setVerifyQueryState({});

        alertOptions?.commonAlertProps?.willClose();
      },
    },
  });
}
