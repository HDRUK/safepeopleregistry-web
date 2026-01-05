import ButtonSave from "@/components/ButtonSave";
import CheckboxList from "@/components/CheckboxList";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import {
  getCustodianValidationChecksQuery,
  postValidationCheckQuery,
  putValidationCheckQuery,
} from "@/services/validation_checks";
import { ValidationCheck } from "@/services/validation_checks/types";
import { Rule } from "@/types/rules";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddNewValidationCheck from "../AddNewValidationCheck";

const NAMESPACE_TRANSLATION = "ValidationChecks";

export enum AppliesTo {
  ProjectHasUser = "ProjectHasUser",
  Organisation = "Organisation",
}

export default function ValidationChecks() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const custodianId = useStore(store => store?.getCustodian()?.id);
  const { showAlert, hideAlert } = useAlertModal();
  const [userChecks, setUserChecks] = useState<boolean[]>([]);
  const [orgChecks, setOrgChecks] = useState<boolean[]>([]);

  const { data: userValidationChecks, ...queryStateProjectUser } = useQuery(
    getCustodianValidationChecksQuery(
      custodianId as number,
      {
        "applies_to[]": AppliesTo.ProjectHasUser,
      },
      {
        staleTime: DEFAULT_STALE_TIME,
      }
    )
  );

  const { data: organisationValidationChecks, ...queryStateOrganisation } =
    useQuery(
      getCustodianValidationChecksQuery(
        custodianId as number,
        {
          "applies_to[]": AppliesTo.Organisation,
        },
        {
          staleTime: DEFAULT_STALE_TIME,
        }
      )
    );

  const { mutateAsync: updateValidationCheck, ...mutateStateEditCheck } =
    useMutation(putValidationCheckQuery());

  const { mutateAsync: createValidationCheck, ...mutateStateCreateCheck } =
    useMutation(postValidationCheckQuery(custodianId as number));

  const refetch = useCallback(async () => {
    queryStateProjectUser.refetch();
    queryStateOrganisation.refetch();
  }, [queryStateOrganisation, queryStateProjectUser]);

  const { isLoading } = getCombinedQueryState([
    queryStateProjectUser,
    queryStateOrganisation,
    mutateStateCreateCheck,
    mutateStateEditCheck,
  ]);

  const formatChecks = (checks: ValidationCheck[]): Rule[] => {
    return (
      checks?.map(check => {
        return {
          id: check.id,
          text: check.description || "",
          active: check.enabled,
        };
      }) || []
    );
  };

  const formattedUserChecks: Rule[] = useMemo(
    () => formatChecks(userValidationChecks?.data || []),
    [userValidationChecks]
  );

  const formattedOrganisationChecks: Rule[] = useMemo(
    () => formatChecks(organisationValidationChecks?.data || []),
    [organisationValidationChecks]
  );

  useEffect(() => {
    if (formattedUserChecks) {
      const newUserChecks = formattedUserChecks.map(check => check.active);
      setUserChecks(newUserChecks);
    }
  }, [formattedUserChecks]);

  useEffect(() => {
    if (formattedOrganisationChecks) {
      const newOrgChecks = formattedOrganisationChecks.map(
        check => check.active
      );
      setOrgChecks(newOrgChecks);
    }
  }, [formattedOrganisationChecks]);

  const onEdit = useCallback(
    async (data: Rule): Promise<void> => {
      const { id, text } = data;
      const payload = {
        description: text,
      };
      if (!id) return;

      await updateValidationCheck({ id, payload }).then(() => refetch());
    },
    [updateValidationCheck, refetch]
  );

  const handleAddCheck = useCallback(
    async (data: Rule, appliesTo: AppliesTo): Promise<void> => {
      const { text } = data;
      const payload = {
        name: text,
        description: text,
        applies_to: `App\\Models\\${appliesTo}` as string,
        enabled: true,
      };
      await createValidationCheck(payload);
      await refetch();
    },
    [refetch, createValidationCheck]
  );

  const handleAddNewUserCheck = useCallback(
    async (data: Rule) => {
      await handleAddCheck(data, AppliesTo.ProjectHasUser);
    },
    [handleAddCheck]
  );

  const handleAddOrganisationCheck = useCallback(
    async (data: Rule) => {
      await handleAddCheck(data, AppliesTo.Organisation);
    },
    [handleAddCheck]
  );

  const handleSubmit = async () => {
    const changes: Promise<unknown>[] = [];

    userValidationChecks?.data?.forEach((check, index) => {
      const currentEnabled = !!userChecks[index];
      if (check.enabled !== currentEnabled) {
        changes.push(
          updateValidationCheck({
            id: check.id,
            payload: { enabled: currentEnabled },
          })
        );
      }
    });

    organisationValidationChecks?.data?.forEach((check, index) => {
      const currentEnabled = !!orgChecks[index];
      if (check.enabled !== currentEnabled) {
        changes.push(
          updateValidationCheck({
            id: check.id,
            payload: { enabled: currentEnabled },
          })
        );
      }
    });

    await Promise.all(changes);

    refetch();

    showAlert({
      severity: "success",
      text: t("updateCheckSuccess"),
      confirmButtonText: t("successButton"),
      onConfirm: async () => {
        hideAlert();
      },
    });
  };

  // leaving as a form template because we might want to switch to form update
  // rather than auto update upon edit
  const formOptions = {};

  return (
    <PageBody heading={t("heading")} description={t("description")}>
      <Form onSubmit={handleSubmit} {...formOptions}>
        <CheckboxList
          isLoading={isLoading}
          items={formattedUserChecks}
          title={t("userChecksTitle")}
          checked={userChecks}
          setChecked={setUserChecks}
          onEdit={onEdit}
          onEditTitle={t("userEditTitle")}
          rightButton={
            <AddNewValidationCheck
              title={t("userAddTitle")}
              onSubmit={handleAddNewUserCheck}
            />
          }
        />
        <CheckboxList
          isLoading={isLoading}
          items={formattedOrganisationChecks}
          title={t("organisationChecksTitle")}
          checked={orgChecks}
          setChecked={setOrgChecks}
          onEdit={onEdit}
          onEditTitle={t("orgEditTitle")}
          rightButton={
            <AddNewValidationCheck
              title={t("userAddTitle")}
              onSubmit={handleAddOrganisationCheck}
            />
          }
        />
        <FormActions>
          <ButtonSave isLoading={isLoading} />
        </FormActions>
      </Form>
    </PageBody>
  );
}
