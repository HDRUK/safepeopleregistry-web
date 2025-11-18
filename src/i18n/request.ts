import { getRequestConfig } from "next-intl/server";
import { IntlErrorCode } from "next-intl";

export default getRequestConfig(async () => {
  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return;
      }

      throw error;
    },
  };
});
