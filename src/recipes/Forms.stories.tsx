import type { StoryObj } from "@storybook/react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface FormsProps {
  codeString: string;
}

const Forms = ({ codeString }: FormsProps) => {
  return (
    <SyntaxHighlighter language="typescript">{codeString}</SyntaxHighlighter>
  );
};

const meta = {
  title: "recipes/Forms",
  component: Forms,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    codeString: `
    interface FormFieldValues {
      name: string;
    }

    const TestComponent = ({ queryState, onSubmit }) => {
      const tForm = useTranslations('Form');

      const defaultValues = {
        name: ''
      };

      const schema = useMemo(
        () =>
          yup.object().shape({
            name: yup.string().required(tForm("nameRequiredInvalid")),
          }),
        []
      );

      const handleSubmit = ({ name }: FormFieldValues) => {
        onSubmit({ name });
      }

      return (
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          autoComplete="off"
          disabled={queryState.isLoading}
        >
          <FormSection>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="name"
                  renderField={fieldProps => (
                    <TextField {...fieldProps} />
                  )}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              type="submit"
              disabled={queryState.isLoading}
              endIcon={<SaveIcon />}
              loading={queryState.isLoading}>
              {tForm("submitButton")}
            </LoadingButton>
          </FormActions>
        </Form>
      );
    }
  `,
  },
};

export const MoreControlExample: Story = {
  args: {
    codeString: `
    interface FormFieldValues {
      name: string;
    }

   const TestComponent = ({ queryState, onSubmit }) => {
      const tForm = useTranslations("Form");

      const defaultValues = {
        name: "",
      };

      const schema = useMemo(
        () =>
          yup.object().shape({
            name: yup.string().required(tForm("nameRequiredInvalid")),
          }),
        []
      );

      const handleSubmit = ({ name }: FormFieldValues) => {
        onSubmit({ name });
      };

      return (
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          autoComplete="off"
          disabled={queryState.isLoading}
        >
          {(methods) => {
            const { setValue } = methods;
            const handleFindAddress = (address: AddressFields) => {
              Object.entries(address).forEach(([key, value]) => {
                setValue(key as keyof DetailsFormValues, value ?? "");
              });
            };
            return (
              <>
                <FormSection>
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <FormControlWrapper
                        name="name"
                        renderField={(fieldProps) => <TextField {...fieldProps} />}
                      />
                    </Grid>
                  </Grid>
                </FormSection>
                <FormActions>
                  <LoadingButton
                    type="submit"
                    disabled={queryState.isLoading}
                    endIcon={<SaveIcon />}
                    loading={queryState.isLoading}
                  >
                    {tForm("submitButton")}
                  </LoadingButton>
                </FormActions>
              </>
            );
          }}
        </Form>
      );
    };
  `,
  },
};
