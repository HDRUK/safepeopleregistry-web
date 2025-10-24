import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormFieldArray from "@/components/FormFieldArray";
import LoadingWrapper from "@/components/LoadingWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { VALIDATION_URL } from "@/consts/form";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedWebhookDescription } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import {
  deleteCustodianWebhookQuery,
  getCustodianWebhooksQuery,
  getWebhookEventTriggerQuery,
  postCustodianWebhookQuery,
} from "@/services/webhooks/index";
import { Webhook } from "@/services/webhooks/types";
import { getCombinedQueryState } from "@/utils/query";
import { showAlert } from "@/utils/showAlert";
import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_FORM = "Form";

interface WebhookFormValues {
  receiver_url: string;
  event_trigger: number;
}

interface WebhookFormData {
  webhooks: WebhookFormValues[];
}

export default function Webhooks() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { custodian } = useStore(state => ({
    custodian: state.config.custodian,
  }));

  const {
    data: webhooksData,
    refetch: refetchWebhookData,
    isLoading: isWebhooksLoading,
  } = useQuery(
    getCustodianWebhooksQuery(custodian?.id, { staleTime: DEFAULT_STALE_TIME })
  );

  const { data: webhookEventTriggers } = useQuery(
    getWebhookEventTriggerQuery({ staleTime: DEFAULT_STALE_TIME })
  );
  const {
    mutateAsync: postWebhook,
    isPending: isPostLoading,
    ...restPostState
  } = useMutation(postCustodianWebhookQuery());
  const {
    mutateAsync: deleteWebhook,
    isPending: isDeleteLoading,
    ...restDeleteState
  } = useMutation(deleteCustodianWebhookQuery(custodian?.id));

  const schema = yup.object<WebhookFormData>().shape({
    webhooks: yup
      .array()
      .of(
        yup.object().shape({
          receiver_url: yup
            .string()
            .required(tForm("websiteRequiredInvalid"))
            .matches(VALIDATION_URL, tForm("websiteFormatInvalid")),
          event_trigger: yup.number().required(tForm("webhookRequiredInvalid")),
        })
      )
      .defined()
      .test("receiver_url", tForm("duplicateWebhookError"), (webhooks = []) => {
        const seen = new Set();
        return !webhooks.some(({ receiver_url }) => {
          if (seen.has(receiver_url)) return true;
          seen.add(receiver_url);
          return false;
        });
      }),
  });

  const defaultValues = useMemo(
    () => ({
      webhooks: webhooksData?.data.map((data: Webhook) => ({
        receiver_url: data.url,
        event_trigger: data.webhook_event,
      })) || [{ receiver_url: "", event_trigger: 1 }],
    }),
    [webhooksData]
  );

  const handleWebhookOperation = async (
    operation: "add" | "delete",
    webhook: Webhook | WebhookFormValues
  ) => {
    if (operation === "add") {
      await postWebhook({
        custodian_id: custodian.id,
        url: (webhook as WebhookFormValues).receiver_url,
        webhook_event_id: (webhook as WebhookFormValues).event_trigger,
      });
    } else {
      await deleteWebhook({ id: (webhook as Webhook).id });
    }
  };

  useQueryAlerts(getCombinedQueryState([restPostState, restDeleteState]));

  const handleSubmit = async (fields: WebhookFormData) => {
    const existingWebhooks = webhooksData?.data || [];
    const formWebhooks = fields.webhooks;

    const webhooksToDelete = existingWebhooks.filter(
      existingWebhook =>
        !formWebhooks.some(
          formWebhook =>
            formWebhook.receiver_url === existingWebhook.url &&
            formWebhook.event_trigger === existingWebhook.webhook_event
        )
    );

    const webhooksToAdd = formWebhooks.filter(
      formWebhook =>
        !existingWebhooks.some(
          existingWebhook =>
            existingWebhook.url === formWebhook.receiver_url &&
            existingWebhook.webhook_event === formWebhook.event_trigger
        )
    );

    try {
      await Promise.all([
        ...webhooksToDelete.map(webhook =>
          handleWebhookOperation("delete", webhook)
        ),
        ...webhooksToAdd.map(webhook => handleWebhookOperation("add", webhook)),
      ]);

      showAlert("success", {
        text: t("saveSuccess"),
        confirmButtonText: t("okButton"),
      });
    } catch (_) {
      showAlert("error", {
        text: <ErrorMessage t={t} tKey="webhookError" />,
        confirmButtonText: tForm("errorButton"),
      });
    }

    await refetchWebhookData();
  };

  return (
    <PageBody>
      <LoadingWrapper variant="basic" loading={isWebhooksLoading}>
        <PageSection heading={t("configurationWebhooks")}>
          <Form<WebhookFormData>
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            shouldResetKeep
            key={`${custodian?.id}-${webhooksData ? "webhooks" : "loading"}`}>
            {({ watch }) => {
              const watchedWebhooks = watch("webhooks");
              const isFormChanged =
                JSON.stringify(watchedWebhooks) !==
                JSON.stringify(defaultValues.webhooks);

              return (
                <>
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <FormFieldArray<WebhookFormData>
                        name="webhooks"
                        displayLabel={false}
                        createNewRow={() => ({
                          receiver_url: "",
                          event_trigger: 1,
                        })}
                        renderField={(field, index, removeButton) => (
                          <Grid container spacing={2} key={field.receiver_url}>
                            <Grid item xs={5}>
                              <FormControlWrapper
                                label="Receiver URL"
                                required
                                labelMd={0}
                                contentMd={12}
                                name={`webhooks.${index}.receiver_url`}
                                placeholder={tForm("name")}
                                renderField={fieldProps => (
                                  <TextField {...fieldProps} />
                                )}
                              />
                            </Grid>
                            <Grid item xs={5.5}>
                              <FormControlWrapper
                                label="Event Trigger"
                                required
                                labelMd={0}
                                contentMd={12}
                                name={`webhooks.${index}.event_trigger`}
                                placeholder={tForm("name")}
                                renderField={fieldProps => (
                                  <Box sx={{ display: "flex" }}>
                                    <Select
                                      {...fieldProps}
                                      inputProps={{
                                        "aria-label": tForm(
                                          "webhookEventAriaLabel"
                                        ),
                                      }}>
                                      {webhookEventTriggers?.data.map(
                                        ({ name, id }) => (
                                          <MenuItem value={id} key={id}>
                                            {name}
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                    {removeButton}
                                  </Box>
                                )}
                              />
                            </Grid>
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box>{mockedWebhookDescription}</Box>
                  <FormActions>
                    <ProfileNavigationFooter
                      previousHref={
                        ROUTES.profileOrganisationDetailsSectorSizeAndWebsite
                          .path
                      }
                      isLoading={isPostLoading || isDeleteLoading}
                      isDisabled={!isFormChanged}
                    />
                  </FormActions>
                </>
              );
            }}
          </Form>
        </PageSection>
      </LoadingWrapper>
    </PageBody>
  );
}
