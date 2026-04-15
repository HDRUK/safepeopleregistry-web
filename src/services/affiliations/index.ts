import deleteAffiliationQuery from "@/services/affiliations/deleteAffiliationQuery";
import getAffiliationsQuery from "@/services/affiliations/getAffiliationsQuery";
import getAffiliationsWorkflowTransitionsQuery from "@/services/affiliations/getAffiliationsWorkflowTransitionsQuery";
import getOrganisationAffiliationQuery from "@/services/affiliations/getOrganisationAffiliationQuery";
import postAffiliationQuery from "@/services/affiliations/postAffiliationQuery";
import putAffiliationQuery from "@/services/affiliations/putAffiliationQuery";
import putRegistryHasAffiliationQuery from "@/services/affiliations/putRegistryHasAffiliationQuery";
import usePaginatedAffiliations from "@/services/affiliations/usePaginatedAffiliations";

export {
  getAffiliationsQuery,
  getOrganisationAffiliationQuery,
  postAffiliationQuery,
  deleteAffiliationQuery,
  putAffiliationQuery,
  putRegistryHasAffiliationQuery,
  usePaginatedAffiliations,
  getAffiliationsWorkflowTransitionsQuery,
};
