"use client";

import {
  ProjectAllUser,
  CustodianProjectUser,
  WithPaginatedQueryParms,
  WithRoutes,
} from "@/types/application";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ViewColumnIconOutlined from "@mui/icons-material/ViewColumnOutlined";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonToggle from "../../components/ButtonToggle";
import ErrorMessage from "../../components/ErrorMessage";
import Results from "../../components/Results";
import { SEARCH_PAGE_MAX_PER_PAGE } from "../../consts/search";
import useProjectEntity from "../../hooks/useProjectEntity";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { KanbanBoardHelperProps } from "../../modules/KanbanBoard";
import PageSection from "../../modules/PageSection";
import ProjectUsersFilters, {
  ProjectUsersFilterKeys,
} from "../../modules/ProjectUsersFilters";
import {
  putCustodianProjectUserQuery,
  usePaginatedCustodianProjectUsers,
} from "../../services/custodian_approvals";
import { EntityType } from "../../types/api";
import ProjectsAddUserModal from "../ProjectsAddUserModal";
import ProjectUsersBoard from "../ProjectUsersBoard";
import ProjectUsersList from "../ProjectUsersList";
import ProjectUsersActions from "./ProjectUsersActions";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Users";
const NAMESPACE_TRANSLATIONS_STATUS = "Application.Status";

type ProjectUsersListProps = WithPaginatedQueryParms<
  WithRoutes<{
    custodianId: number;
    projectId?: number;
    variant: EntityType;
  }>
>;

export default function ProjectUsers({
  custodianId,
  projectId,
  routes,
  variant,
  paginatedQueryParams,
}: ProjectUsersListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);
  const tStatus = useTranslations(NAMESPACE_TRANSLATIONS_STATUS);
  const queryClient = useQueryClient();
  const [invitedUsers, setInvitedUsers] = useState<ProjectAllUser[]>([]);

  const [showListView, setShowListView] = useState(
    variant !== EntityType.CUSTODIAN
  );

  const [showAddModal, setShowAddModal] = useState(false);

  const {
    query: {
      data: custodianProjectUsers,
      page,
      last_page,
      total,
      setPage,
      updateQueryParams,
      resetQueryParams,
      handleSortToggle,
      handleFieldToggle,
      refetch,
      queryParams,
      ...queryState
    },
    states,
    helpers: { isTransitionAllowed, itemsByTransitions, getAllowedTransitions },
  } = useProjectEntity({
    usePaginatedQuery: () =>
      usePaginatedCustodianProjectUsers(custodianId, {
        defaultQueryParams: {
          project_id: projectId,
        },
      }),
    variant: EntityType.USER,
  });

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectUserQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  useQueryAlerts(updateValidationMutationState, {
    successAlertProps: {
      willClose: () => {
        queryClient.invalidateQueries({
          queryKey: ["getPaginatedCustodianProjectUsers", custodianId],
        });

        refetch();
      },
    },
    showOnlyError: !showListView,
  });

  const handleUpdateSafePeople = useCallback(
    async (id: number, status: string) => {
      await changeValidationStatus({
        params: {
          projectUserId: id,
        },
        payload: {
          status,
          comment: "status change",
        },
      });
    },
    [showListView]
  );

  const handleInvite = (user: ProjectAllUser) => {
    setInvitedUsers([user, ...invitedUsers]);
  };

  useEffect(() => {
    updateQueryParams({
      per_page: !showListView
        ? SEARCH_PAGE_MAX_PER_PAGE
        : paginatedQueryParams.perPage,
    });

    refetch();
  }, [showListView, paginatedQueryParams]);

  const filterProps = {
    resetQueryParams,
    updateQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    isTransitionAllowed,
  };

  const updateQueryState = { isError, isSuccess, reset };

  const commonProps = useMemo(
    () => ({
      data: custodianProjectUsers,
      routes,
      itemsByTransitions,
      onMove: handleUpdateSafePeople,
      onDragEnd: handleUpdateSafePeople,
      actions: (props: KanbanBoardHelperProps<CustodianProjectUser>) => {
        return (
          <ProjectUsersActions
            onDelete={() => refetch()}
            onPrimaryContactChange={() => refetch()}
            t={t}
            tStatus={tStatus}
            onMoveClick={async (id, status) => {
              handleUpdateSafePeople(id, status);
            }}
            allowedTransitions={getAllowedTransitions(
              props.data.model_state.state.slug
            )}
            {...props}
          />
        );
      },
      getAllowedTransitions,
      updateQueryState,
    }),
    [showListView, custodianProjectUsers, itemsByTransitions, routes, t]
  );

  const listComponent = !showListView ? (
    <ProjectUsersBoard
      options={{
        isTransitionAllowed,
      }}
      {...commonProps}
    />
  ) : (
    <ProjectUsersList
      {...commonProps}
      total={total}
      last_page={last_page}
      page={page}
      setPage={setPage}
      isPaginated
      variant={variant}
      t={t}
    />
  );

  return (
    <>
      <PageSection>
        <ProjectUsersFilters
          statusList={states}
          includeFilters={
            !showListView
              ? []
              : [ProjectUsersFilterKeys.SORT, ProjectUsersFilterKeys.STATUS]
          }
          {...filterProps}>
          {variant === EntityType.CUSTODIAN && (
            <ButtonToggle
              toggleOffButtonProps={{
                startIcon: <ListIcon />,
                label: "Switch to list view",
              }}
              toggleOnButtonProps={{
                startIcon: <ViewColumnIconOutlined />,
                label: "Switch to board view",
              }}
              onToggle={setShowListView}
              sx={{ flexShrink: 0 }}
            />
          )}
          {variant !== EntityType.USER && projectId && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setShowAddModal(true)}>
              {variant === EntityType.ORGANISATION
                ? t("requestAddNewMemberButton")
                : t("addNewMemberButton")}
            </Button>
          )}
        </ProjectUsersFilters>
      </PageSection>

      {projectId && (
        <ProjectsAddUserModal
          invitedUsers={invitedUsers}
          onInvite={handleInvite}
          request={variant === EntityType.ORGANISATION}
          projectId={projectId}
          custodianId={custodianId}
          open={showAddModal}
          onClose={() => {
            setInvitedUsers([]);
            setShowAddModal(false);
          }}
        />
      )}

      <PageSection>
        <Results
          total={total}
          noResultsMessage={
            projectId ? t("noResultsMessageProject") : t("noResultsMessage")
          }
          errorMessage={<ErrorMessage t={t} tKey="errorMessage" />}
          queryState={queryState}>
          {/* note this is using paginated data */}
          {itemsByTransitions && listComponent}
        </Results>
      </PageSection>
    </>
  );
}
