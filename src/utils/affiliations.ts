import dayjs from "dayjs";
import { Status } from "@/consts/application";
import {
  AFFILIATION_END_WARNING_DAYS,
  AffiliationEndDateSource,
} from "@/consts/user";
import { ResearcherAffiliation } from "@/types/application";

// An affiliation in one of these is history: never edited, deleted or reused.
const ENDED_AFFILIATION_STATUSES = [
  Status.AFFILIATION_LEFT,
  Status.AFFILIATION_NEVER_VERIFIED,
];

function getAffiliationStatus(affiliation: ResearcherAffiliation) {
  return affiliation.model_state?.state.slug;
}

function isAffiliationEnded(affiliation: ResearcherAffiliation) {
  return ENDED_AFFILIATION_STATUSES.includes(
    getAffiliationStatus(affiliation) as Status
  );
}

// Once an Organisation has affiliated the user, only the end date can change.
function isAffiliationEditable(affiliation: ResearcherAffiliation) {
  return (
    !isAffiliationEnded(affiliation) &&
    getAffiliationStatus(affiliation) !== Status.AFFILIATION_APPROVED
  );
}

function isAffiliationInfoRequired(affiliation: ResearcherAffiliation) {
  return getAffiliationStatus(affiliation) === Status.AFFILIATION_INFO_REQUIRED;
}

function isAffiliationEmailVerifyRequired(affiliation: ResearcherAffiliation) {
  return getAffiliationStatus(affiliation) === Status.AFFILIATION_EMAIL_VERIFY;
}

function canRecordAffiliationEndDate(affiliation: ResearcherAffiliation) {
  return (
    !isAffiliationEnded(affiliation) &&
    getAffiliationStatus(affiliation) !== Status.AFFILIATION_REJECTED
  );
}

function isAffiliationEndDateSetByOrganisation(
  affiliation?: Partial<ResearcherAffiliation>
) {
  return affiliation?.end_date_source === AffiliationEndDateSource.ORGANISATION;
}

function isAffiliationEndingSoon(affiliation: ResearcherAffiliation) {
  if (!affiliation.to || isAffiliationEnded(affiliation)) return false;

  const endDate = dayjs(affiliation.to);
  const today = dayjs().startOf("day");

  return (
    !endDate.isBefore(today) &&
    endDate.isBefore(today.add(AFFILIATION_END_WARNING_DAYS + 1, "day"))
  );
}

const VERIFICATION_CODE_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isVerificationCode(value: unknown): value is string {
  return typeof value === "string" && VERIFICATION_CODE_PATTERN.test(value);
}

export {
  ENDED_AFFILIATION_STATUSES,
  canRecordAffiliationEndDate,
  isAffiliationEditable,
  isAffiliationEmailVerifyRequired,
  isAffiliationEndDateSetByOrganisation,
  isAffiliationEnded,
  isAffiliationEndingSoon,
  isAffiliationInfoRequired,
  isVerificationCode,
};
