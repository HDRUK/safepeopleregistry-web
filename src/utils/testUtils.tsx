import ReactQueryClientProvider from "@/app/[locale]/components/ReactQueryClientProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
  RenderResult,
  act,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";
import { axe } from "jest-axe";
import { NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";
import messages from "../config/locales/en.json";

const defineMatchMedia = (width: number) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: <T,>(query: T) => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {},
    }),
  });
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <AppCacheProvider>
        <LocalizationProvider>
          <ReactQueryClientProvider>
            <ThemeRegistry>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </ThemeRegistry>
          </ReactQueryClientProvider>
        </LocalizationProvider>
      </AppCacheProvider>
    </NextIntlClientProvider>
  );
};

interface OptionProps
  extends RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > {
  wrapperProps: Record<string, unknown>;
}

interface UserRenderResults extends RenderResult {
  user: UserEvent;
}

const customRender = (
  ui: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >,
  options?: OptionProps
): UserRenderResults => {
  const { wrapperProps, ...rest } = options || {};

  return {
    ...render(ui, {
      wrapper: props => <Wrapper {...props} {...wrapperProps} />,
      ...rest,
    }),
    user: userEvent.setup(),
  };
};

interface OptionHookProps<P = unknown>
  extends RenderHookOptions<
    P,
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > {
  wrapperProps?: Record<string, unknown>;
}

const customRenderHook = <P, R>(
  ui: (initialProps: P) => R,
  options?: OptionHookProps<P>
): RenderHookResult<R, P> => {
  const { wrapperProps, ...rest } = options || {};
  return renderHook(ui, {
    wrapper: props => <Wrapper {...props} {...wrapperProps} />,
    ...rest,
  });
};

const commonAccessibilityTests = async (rendered: RenderResult) => {
  const { container } = rendered;

  let results;

  await act(async () => {
    results = await axe(container);
  });

  expect(results).toHaveNoViolations();
};

const clearInput = async (element: HTMLElement) => {
  await userEvent.click(element);
  await userEvent.clear(element);
};

global.clearInput = clearInput;

async function clearInputsByLabelText(inputs: (string | RegExp)[]) {
  inputs.forEach(async selector => {
    const element = screen.getAllByLabelText(selector)[0];

    clearInput(element);
  });
}

async function changeSelectValueByLabelText(
  selector: string | RegExp,
  value: string
) {
  const dropdown = await screen.findAllByLabelText(selector);
  const button = within(dropdown[0]).getByRole("combobox");

  await userEvent.click(button);

  const listbox = screen.getByRole("listbox");

  await userEvent.click(
    await within(listbox).getByText(new RegExp(value, "i"))
  );
}

global.changeSelectValueByLabelText = changeSelectValueByLabelText;
global.clearInputsByLabelText = clearInputsByLabelText;

export * from "@testing-library/react";
export * from "@testing-library/user-event";

export {
  clearInput,
  clearInputsByLabelText,
  commonAccessibilityTests,
  defineMatchMedia,
  customRender as render,
  customRenderHook as renderHook,
};
