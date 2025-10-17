import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import OrganisationUsersTable from "@/modules/OrganisationUsersTable";
import { SearchDirections } from "../../consts/search";
import usePaginatedQuery from "../../hooks/usePaginatedQuery";
import { PageBody, PageSection } from "../../modules";
import OrganisationUsersBulkInvite from "../../modules/OrganisationUsersBulkInvite";
import OrganisationUsersFilters from "../../modules/OrganisationUsersFilters";
import useMutationWithConfirmation from "../../queries/useMutationWithConfirmation";
import { deleteAffiliationQuery } from "../../services/affiliations";
import { getOrganisationRegistriesQuery } from "../../services/organisations";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function OrganisationUsers() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { organisation, routes, transitions } = useStore(state => ({
    organisation: state.config.organisation,
    routes: state.getApplication().routes,
    transitions: state.getAffiliationsWorkflowTransitions(),
  }));

  const {
    data: usersData,
    refetch: refetchOrganisationUsers,
    total,
    last_page,
    page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleFieldToggle,
    queryParams,
    ...userDataQueryState
  } = usePaginatedQuery({
    ...getOrganisationRegistriesQuery(organisation?.id as number),
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
    },
    enabled: !!organisation,
  });

  const { showConfirm } = useMutationWithConfirmation(
    deleteAffiliationQuery(),
    {
      onSuccess: () => {
        refetchOrganisationUsers();
      },
    }
  );

  return (
    <PageBody heading={t("employeeStudentAdminTitle")}>
      <PageSection>
        <OrganisationUsersFilters
          statusList={Object.keys(transitions || {})}
          updateQueryParams={updateQueryParams}
          resetQueryParams={resetQueryParams}
          handleFieldToggle={handleFieldToggle}
          queryParams={queryParams}
        />
      </PageSection>
      <PageSection>
        <OrganisationUsersTable
          total={total}
          isPaginated
          page={page}
          setPage={setPage}
          last_page={last_page}
          data={usersData || []}
          queryState={userDataQueryState}
          onRemove={id => showConfirm(id)}
          routes={{
            name: routes.profileOrganisationUsersIdentity,
          }}
          t={t}
        />
        <OrganisationUsersBulkInvite
          organisation={organisation}
          onSuccess={refetchOrganisationUsers}
        />
      </PageSection>
    </PageBody>
  );
}
