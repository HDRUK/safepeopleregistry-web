import messages from "@/config/locales/en.json";
import IntlClientProvider from "@/context/IntlClientProvider";
import type { Preview, StoryFn } from "@storybook/react";
import ReactQueryClientProvider from "../src/components/ReactQueryClientProvider";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";
import AlertModalProvider from "@/context/AlertModalProvider";

export const withMuiTheme = (Story: StoryFn) => {
  return (
    <IntlClientProvider locale="en" messages={messages}>
      <ThemeRegistry>
        <ReactQueryClientProvider>
          <AlertModalProvider>
            <Story />
          </AlertModalProvider>
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
