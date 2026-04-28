interface CustomMatchers<R = unknown> {
  toBeControlledBy: (trigger: HTMLElement) => R;
}

declare namespace jest {
  type Expect = CustomMatchers;
  type Matchers<R> = CustomMatchers<R>;
}

declare global {
  function mockUseStore(config?: Partial<StoreState>): void;
  function clearInputsByLabelText(selectors: (string | RegExp)[]): void;
  function clearInput(element: HTMLElement): void;
  function openSelectByLabelText(selector: string | RegExp): void;
  function changeSelectValueByLabelText(
    selector: string | RegExp,
    value: string,
    options?: {
      component: "Select" | "ActionList";
    }
  ): void;
}

declare function mockUseStore(config?: Partial<StoreState>): string;
declare function clearInputsByLabelText(selectors: (string | RegExp)[]): void;
declare function clearInput(element: HTMLElement): void;
declare function openSelectByLabelText(selector: string | RegExp): void;
declare function changeSelectValueByLabelText(
  selector: string | RegExp,
  value: string,
  options?: {
    component: "Select" | "ActionList";
  }
): void;
