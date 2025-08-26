import type { Meta, StoryObj } from "@storybook/react";

import StatusList from "./StatusList";
import { Status } from "../ChipStatus";

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
