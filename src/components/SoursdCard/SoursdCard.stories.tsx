import type { Meta, StoryObj } from "@storybook/react";

import SoursdCard from ".";
import { Status } from "../ChipStatus";

const meta = {
  title: "components/SoursdCard",
  component: SoursdCard,
  tags: ["autodocs"],
} satisfies Meta<typeof SoursdCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: Status.PENDING,
    name: "Health Data Research",
    identifier: "kYBp5K52M5zIoTKtL785UpWgVCsjFZcbxYlKVX5C",
    description:
      "This ‘key’ represents you as an Organisation within the Safe People Registry. This is unique to you! Custodians may ask you for this to confirm your identity.",
  },
};
