import type { Meta, StoryObj } from "@storybook/react";

import { mockedFile } from "@/mocks/data/file";
import FileDownloadLink from "./FileDownloadLink";

const meta = {
  title: "components/FileDownloadLink",
  component: FileDownloadLink,
  tags: ["autodocs"],
} satisfies Meta<typeof FileDownloadLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    file: mockedFile({
      name: "Download SRO application",
    }),
  },
};
