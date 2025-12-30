import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      savePropValueAsString: true,
      propFilter: (prop: any) => {
        if (prop.parent && /node_modules/.test(prop.parent.fileName)) {
          return !(
            prop.parent.name === "AnchorHTMLAttributes" ||
            prop.parent.name === "AriaAttributes" ||
            prop.parent.name === "ButtonHTMLAttributes" ||
            prop.parent.name === "DOMAttributes" ||
            prop.parent.name === "FormHTMLAttributes" ||
            prop.parent.name === "HTMLAttributes" ||
            prop.parent.name === "ImgHTMLAttributes" ||
            prop.parent.name === "InputHTMLAttributes"
          );
        }
        return true;
      },
    },
  },
  staticDirs: ["../public"],
};
export default config;
