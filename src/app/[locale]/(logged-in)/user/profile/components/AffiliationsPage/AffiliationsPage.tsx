"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import { Status } from "@/components/ChipStatus";
import FormModal from "@/components/FormModal";
import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { useStore } from "@/data/store";
import useQueryAlertFromServer from "@/hooks/useQueryAlertFromServer";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { mockedResearcherAffiliationsGuidance } from "@/mocks/data/cms";
import {
  AffiliationsTable,
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import {
  deleteAffiliationQuery,
  postAffiliationQuery,
  putAffiliationQuery,
  usePaginatedAffiliations,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { ResearcherAffiliation } from "@/types/application";
import { QueryState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { showAlert } from "@/utils/showAlert";
import { renderErrorToString } from "@/utils/translations";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_AFFILIATIONS = "Affiliations";

type AffiliationsPageProps = {
  queryState: QueryState<ResearcherAffiliation>;
};

export default function AffiliationsPage({
  queryState,
}: AffiliationsPageProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const t = useTranslations(NAMESPACE_TRANSLATION_AFFILIATIONS);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState<
    ResearcherAffiliation | undefined
  >(undefined);
  const routes = useStore(state => state.getApplication().routes);

  const user = useStore(state => state.getUser());

  const {
    data: affiliationsData,
    last_page,
    total,
    setPage,
    refetch,
    ...getAffiliationsQueryState
  } = usePaginatedAffiliations(user?.registry_id);

  const { mutateAsync: postAffiliations, ...postAffiliationQueryState } =
    useMutation(postAffiliationQuery(user));

  const { mutateAsync: putAffiliation, ...putAffiliationQueryState } =
    useMutation(putAffiliationQuery());

  const { mutateAsync: deleteAffiliation, ...restDeleteState } = useMutation(
    deleteAffiliationQuery()
  );

  const {
    queryState: inviteQueryState,
    handleSubmit: handleCreateAndInviteOrganisation,
    mutateOrganisationInvite,
  } = useOrganisationInvite();

  const combinedQueryState = getCombinedQueryState(
    [inviteQueryState, postAffiliationQueryState, putAffiliationQueryState],
    false
  ) as QueryState;

  const isEdit = !!selectedAffiliation;
  const mutationState = isEdit
    ? putAffiliationQueryState
    : postAffiliationQueryState;
  const vars = mutationState.variables as
    | { current_employer?: boolean; email?: string }
    | undefined;
  const isVerification = !isEdit && !!vars?.current_employer;

  useQueryAlerts(mutationState, {
    onSuccess: () => {
      setOpen(false);
      setSelectedAffiliation(undefined);
    },
    successAlertProps: {
      ...(isVerification && {
        title: tProfile("affiliationActionVerificationTitle"),
      }),
      confirmButtonText: tProfile(
        isVerification
          ? "affiliationActionVerificationButton"
          : "affiliationActionSuccessButton"
      ),
      text: isEdit
        ? tProfile("putAffiliationSuccess")
        : isVerification
          ? tProfile("postAffiliationVerification", {
              email: vars?.email ?? "",
            })
          : tProfile("postAffiliationSuccess"),
    },
    ...(isVerification && { successAlertType: "info" }),
    errorAlertProps: {
      text: renderErrorToString(tProfile, "affiliationActionError"),
      confirmButtonText: tProfile("affiliationActionErrorButton"),
    },
  });

  const verifiedOrganisationName =
    queryState.data?.organisation.organisation_name;

  useQueryAlertFromServer(queryState, {
    successAlertProps: {
      title: tProfile("affiliationRequestSentTitle"),
      confirmButtonText: tProfile("affiliationRequestSentButton"),
      text: tProfile("affiliationRequestSentDescription", {
        organisationName: verifiedOrganisationName,
      }),
      willClose: () => {
        router.replace(routes.profileResearcherAffiliations.path);
      },
    },
    successAlertType: "info",
    errorAlertProps: {
      text: renderErrorToString(
        tProfile,
        "affiliationRequestSentErrorDescription"
      ),
      confirmButtonText: tProfile("affiliationRequestSentErrorButton"),
    },
    enabled: !!verifiedOrganisationName,
  });

  const showConfirmDelete = useQueryConfirmAlerts(restDeleteState, {
    onSuccess: () => refetch(),
    confirmAlertProps: {
      text: tProfile("affiliationsDeleteConfirmMessage"),
      preConfirm: async (id: number) => {
        await deleteAffiliation(id);
      },
    },
    successAlertProps: {
      text: tProfile("affiliationsDeleteSuccessMessage"),
    },
    errorAlertProps: {
      text: renderErrorToString(tProfile, "affiliationsDeleteErrorMessage"),
    },
  });

  const handleResendInvite = async (affiliation: ResearcherAffiliation) => {
    await mutateOrganisationInvite(affiliation?.organisation_id as number);
    showAlert("success", {
      text: tProfile("resendInviteSuccess"),
    });
  };

  const renderActionMenuCell = useCallback(
    (info: CellContext<ResearcherAffiliation, unknown>) => {
      const affiliation = info.row.original;
      const status = affiliation.registryAffiliationState;
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              setSelectedAffiliation(affiliation);
              setOpen(true);
            }}
            sx={{ color: "secondary.main" }}
            icon={<CreateOutlinedIcon sx={{ color: "secondary.main" }} />}>
            {tProfile("viewOrEdit")}
          </ActionMenuItem>
          {status === Status.AFFILIATION_INVITED && (
            <ActionMenuItem
              disabled={inviteQueryState.isLoading}
              onClick={() => {
                setSelectedAffiliation(affiliation);
                handleResendInvite(affiliation);
              }}
              sx={{ color: "secondary.main" }}
              icon={
                inviteQueryState.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <EmailIcon sx={{ color: "secondary.main" }} />
                )
              }>
              {tProfile("reinviteOrganisation")}
            </ActionMenuItem>
          )}
          <ActionMenuItem
            onClick={() => showConfirmDelete(affiliation.id)}
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {tProfile("delete")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    [inviteQueryState]
  );

  const extraColumns = [
    {
      accessorKey: "action",
      header: "",
      cell: renderActionMenuCell,
    },
  ];

  const handleDetailsSubmit = useCallback(
    async (fields: PostAffiliationPayload) => {
      let organisation_id = fields?.organisation_id;

      if (!organisation_id) {
        const invitePayload = {
          organisation_name: fields.organisation_name as string,
          lead_applicant_email: fields.organisation_email as string,
        };
        organisation_id =
          await handleCreateAndInviteOrganisation(invitePayload);
      }

      const {
        organisation_name: _name,
        organisation_email: _email,
        ...restFields
      } = fields;

      const payload = {
        ...restFields,
        organisation_id,
      };

      if (selectedAffiliation) {
        // Update existing affiliation
        await putAffiliation({
          affiliationId: selectedAffiliation.id,
          payload,
        });
      } else {
        // Create new affiliation
        await postAffiliations(payload);
      }
      refetch();
    },
    [selectedAffiliation, postAffiliations, putAffiliation]
  );

  const orcIdBannerToAppear = affiliationsData?.some(affiliation => {
    return affiliation.organisation_id === null || affiliation.email === null;
  });

  return (
    <PageBodyContainer heading={tProfile("affiliationsTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <PageBody>
            <PageSection>
              <FormModal
                open={open}
                isDismissable
                onClose={() => {
                  setOpen(false);
                }}
                heading={
                  selectedAffiliation
                    ? tProfile("editAffiliationForm")
                    : tProfile("addAffiliationSelectOrganisationForm")
                }>
                <AffiliationsForm
                  onClose={() => {
                    setOpen(false);
                    setSelectedAffiliation(undefined);
                  }}
                  onSubmit={handleDetailsSubmit}
                  queryState={combinedQueryState}
                  initialValues={selectedAffiliation}
                />
              </FormModal>
              <Typography sx={{ mb: 2 }}>
                {tProfile("affiliationsDescription")}
              </Typography>
              {!!orcIdBannerToAppear && (
                <Message severity="warning" sx={{ mb: 2 }}>
                  {/* This contains a link in the designs that should link to the first entry that needed to be edited, this can be implemented once edit affiliations is implemented */}
                  {tProfile("missingOrcIdMessage")}
                </Message>
              )}{" "}
              {affiliationsData && (
                <AffiliationsTable
                  t={t}
                  extraColumns={extraColumns}
                  data={affiliationsData}
                  queryState={getAffiliationsQueryState}
                  last_page={last_page}
                  total={total}
                  setPage={setPage}
                />
              )}
            </PageSection>

            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedAffiliation(undefined);
                  setOpen(true);
                }}>
                {tProfile("addAffiliation")}
              </Button>
            </div>

            <ProfileNavigationFooter
              previousHref={routes.profileResearcherExperience.path}
              nextHref={routes.profileResearcherTraining.path}
              nextStepText={tProfile("training")}
              isLoading={combinedQueryState.isLoading}
            />
          </PageBody>
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <Guidance
            {...mockedResearcherAffiliationsGuidance}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
