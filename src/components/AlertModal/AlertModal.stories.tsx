import { Button } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import AlertModal, { AlertModalProps } from "./AlertModal";
import useQueryAlerts from "@/hooks/useQueryAlerts";

const meta = {
  title: "components/AlertModal",
  component: AlertModal,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}>
          Show
        </Button>
        <AlertModal
          {...args}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    severity: "success",
    title: "Success",
    text: "This is a success alert modal.",
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
  } as AlertModalProps,
};
