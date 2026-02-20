import { Status } from "./application";

enum ProjectDetailsAccessType {
  TRE = "TRE",
  RELEASE = "RELEASE",
}

enum RequestFrequency {
  ONE_OFF = "ONE-OFF",
  RECURRING = "RECURRING",
}

const DISABLED_ORGANISATION_STATUS = [Status.INVITED, Status.SYSTEM_APPROVAL];
const DISABLED_USER_STATUS = [Status.INVITED];

export {
  ProjectDetailsAccessType,
  RequestFrequency,
  DISABLED_ORGANISATION_STATUS,
  DISABLED_USER_STATUS,
};
