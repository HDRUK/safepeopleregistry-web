import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  waitFor,
  screen,
} from "../../utils/testUtils";
import AddressForm from "./AddressForm";
import { FormHelperContext } from "@/components/Form/FormHelperContext";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("AddressForm", () => {
  const renderAddressForm = () =>
    render(
      <Wrapper>
        <FormHelperContext.Provider
          value={{
            isFieldRequired: () => false,
          }}>
          <AddressForm name="address" />
        </FormHelperContext.Provider>
      </Wrapper>
    );

  it("updates form values when an address is selected from GoogleAutocomplete", async () => {
    renderAddressForm();

    const fieldValues = [
      { testId: "address.address_1", value: "123 Random Street" },
      { testId: "address.address_2", value: "Apt 456" },
      { testId: "address.town", value: "Random Town" },
      { testId: "address.postcode", value: "12345" },
    ];

    fieldValues.forEach(({ testId, value }) => {
      fireEvent.change(screen.getByTestId(testId).querySelector("input")!, {
        target: { value },
      });
    });

    await waitFor(() => {
      fieldValues.forEach(({ testId, value }) => {
        const input = screen.getByTestId(testId).querySelector("input")!;
        expect(input).toHaveValue(value);
      });
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAddressForm());
  });
});
