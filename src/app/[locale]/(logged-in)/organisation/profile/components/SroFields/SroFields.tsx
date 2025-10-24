"use client";

import FormControlWrapper from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import Markdown from "@/components/Markdown";
import SelectDepartments from "@/components/SelectDepartments";
import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Form";

export default function SroFields() {
  const { organisation, user } = useStore(state => ({
    organisation: state.getOrganisation(),
    user: state.getUser(),
  }));

  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageSection>
      {user?.is_delegate === 0 && (
        <FormSection
          heading={t("keyContactFormTitle")}
          description={<Markdown>{t("keyContactFormDescription")}</Markdown>}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="department"
                renderField={fieldProps => (
                  <SelectDepartments
                    organisation={organisation}
                    {...fieldProps}
                    inputProps={{
                      "aria-label": t("departmentNameAriaLabel"),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="role"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="email"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormSection>
      )}
    </PageSection>
  );
}
