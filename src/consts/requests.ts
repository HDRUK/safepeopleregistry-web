enum ResponseMessageType {
  SUCCESS = "success",
  FAILURE = "failure",
}

const DEFAULT_STALE_TIME = 1000 * 60 * 10; // 10 minutes

export { ResponseMessageType, DEFAULT_STALE_TIME };
