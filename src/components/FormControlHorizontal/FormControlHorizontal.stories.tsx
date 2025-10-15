import { TextField } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import FormControlHorizontal, { FormControlHorizontalProps } from ".";
import Form from "../Form";

const mockRouter = {
  back: () => {},
  forward: () => {},
  push: () => {},
  replace: () => {},
  refresh: () => {},
  prefetch: () => Promise.resolve(),
};

const RouterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterContext.Provider value={mockRouter}>
      {children}
    </AppRouterContext.Provider>
  );
};
const meta = {
  title: "components/FormControlHorizontal",
  component: FormControlHorizontal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormControlHorizontal>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormControlHorizontalProvider = (props: FormControlHorizontalProps) => {
  return (
    <RouterWrapper>
      <Form defaultValues={{ name: "" }}>
        <FormControlHorizontal {...props} />
      </Form>
    </RouterWrapper>
  );
};

export const Basic: Story = {
  args: {
    label: "Email",
    name: "email",
    renderField: fieldProps => <TextField {...fieldProps} />,
  },
  render: props => <FormControlHorizontalProvider {...props} />,
};
