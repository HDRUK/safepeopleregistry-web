import messages from "@/config/locales/en.json";
import IntlClientProvider from "@/context/IntlClientProvider";
import type { Preview, StoryFn } from "@storybook/react";
import ReactQueryClientProvider from "../src/components/ReactQueryClientProvider";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";

export const withMuiTheme = (Story: StoryFn) => {
  return (
    <IntlClientProvider locale="en" messages={messages}>
      <ThemeRegistry>
        <ReactQueryClientProvider>
          <Story />
        </ReactQueryClientProvider>
      </ThemeRegistry>
    </IntlClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
