import type { Meta, StoryObj } from "@storybook/react";

import { Status } from "@/consts/application";
import StatusList from "./StatusList";

const meta = {
  title: "components/StatusList",
  component: StatusList,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    projectStatus: Status.PROJECT_COMPLETED,
    validationStatus: Status.VALIDATED,
    affiliationStatus: Status.AFFILIATED,
    organisationStatus: Status.ORG_LEFT_PROJECT,
  },
};
