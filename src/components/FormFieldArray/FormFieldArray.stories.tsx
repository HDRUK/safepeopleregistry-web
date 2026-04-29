import type { Meta, StoryObj } from "@storybook/react";
import { TextField, Grid, Box } from "@mui/material";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useFormContext, Controller } from "react-hook-form";
import { ReactNode } from "react";
import FormFieldArray from "./FormFieldArray";
import Form from "../Form";
import FormControlWrapper from "../FormControlWrapper";
import SelectCountry from "../SelectCountry";

const mockRouter = {
  back: () => {},
  forward: () => {},
  push: () => {},
  replace: () => {},
  refresh: () => {},
  prefetch: () => Promise.resolve(),
};

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppRouterContext.Provider value={mockRouter}>
    {children}
  </AppRouterContext.Provider>
);

const meta = {
  title: "components/FormFieldArray",
  component: FormFieldArray,
  tags: ["autodocs"],
} satisfies Meta<typeof FormFieldArray>;

export default meta;

type Story = StoryObj<typeof meta>;

interface RenderFieldProps {
  field: unknown;
  index: number;
  removeButton: ReactNode;
}
const RenderField = ({ index, removeButton }: RenderFieldProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Controller
        render={({ field: subField }) => <TextField {...subField} />}
        name={`users.${index}.name`}
        control={control}
      />
      <Controller
        render={({ field: subField }) => <TextField {...subField} />}
        name={`users.${index}.email`}
        control={control}
      />
      {removeButton}
    </div>
  );
};

// -- Basic example --
const FormFieldArrayBasicProvider = props => (
  <RouterWrapper>
    <Form
      defaultValues={{
        users: [{ name: "test name", email: "test@test.com" }],
      }}>
      <FormFieldArray
        {...props}
        name="users"
        initialRowCount={1}
        minimumRows={1}
        createNewRow={() => ({
          name: "John Doe",
          email: "john@example.com",
        })}
        renderField={RenderField}
      />
    </Form>
  </RouterWrapper>
);

export const Basic: Story = {
  render: props => <FormFieldArrayBasicProvider {...props} />,
};

const FormFieldArrayWithDefaultsProvider = () => {
  const defaultValues = {
    charities: [
      { country: "United Kingdom", registration_id: "12345678" },
      { country: "Germany", registration_id: "98765432" },
    ],
  };

  return (
    <RouterWrapper>
      <Form defaultValues={defaultValues}>
        <FormFieldArray
          name="charities"
          initialRowCount={1}
          minimumRows={1}
          displayLabel={false}
          createNewRow={() => ({
            country: "Antarctica",
            registration_id: "1234",
          })}
          addButtonLabel="Add another charity"
          renderField={(field, index, removeButton) => (
            <Grid container columnSpacing={3}>
              <Grid size={{ xs: 5 }}>
                <FormControlWrapper
                  fullWidth
                  sx={{
                    width: "100%",
                  }}
                  name={`charities.${index}.country`}
                  placeholder="Country"
                  renderField={({ value, onChange, ...rest }) => (
                    <SelectCountry
                      useCountryCode={false}
                      value={value}
                      onChange={onChange}
                      {...rest}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 5 }}>
                <FormControlWrapper
                  displayLabel
                  fullWidth
                  name={`charities.${index}.registration_id`}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid size={{ xs: 1 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  {removeButton}
                </Box>
              </Grid>
            </Grid>
          )}
        />
      </Form>
    </RouterWrapper>
  );
};

export const WithDefaults: Story = {
  render: () => <FormFieldArrayWithDefaultsProvider />,
};
