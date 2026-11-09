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

export {
  ENDED_AFFILIATION_STATUSES,
  canRecordAffiliationEndDate,
  isAffiliationEditable,
  isAffiliationEndDateSetByOrganisation,
  isAffiliationEnded,
  isAffiliationEndingSoon,
};
