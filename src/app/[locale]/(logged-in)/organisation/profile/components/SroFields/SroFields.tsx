"use client";

import { PageSection } from "@/modules";
import FormControl from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import { Grid, TextField } from "@mui/material";
import SelectDepartments from "@/components/SelectDepartments";
import Markdown from "@/components/Markdown";
import { useStore } from "@/data/store";
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
          <Grid
            container
            rowSpacing={3}
            sx={{ width: "70%", justifyContent: "flex-start" }}>
            <Grid item xs={12}>
              <FormControl
                name="first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                name="last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
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
              <FormControl
                name="role"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                name="email"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                name="sro_profile_uri"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormSection>
      )}
    </PageSection>
  );
}
