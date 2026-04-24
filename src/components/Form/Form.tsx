import { yupResolver } from "@hookform/resolvers/yup";
import { Box, BoxProps, Grid } from "@mui/material";
import deepEqual from "deep-equal";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { AnyObject } from "yup";
import { isFieldRequired } from "../../utils/form";
import yup from "../../config/yup";
import FormCanLeave from "../FormCanLeave";
import FormModal, { FormModalProps } from "../FormModal";
import { Message } from "../Message";
import { FormHelperContext } from "@/components/Form/FormHelperContext";

export type ExtendedUseFormReturn<T extends FieldValues> = UseFormReturn<T> & {
  isFieldRequired: (fieldName: keyof T) => boolean;
};

export interface FormProps<T extends AnyObject> extends Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  autoComplete?: "off";
  error?: ReactNode;
  onSubmit?: (values: T) => void | Promise<void>;
  sx?: BoxProps["sx"];
  defaultValues?: DefaultValues<T>;
  schema?: yup.ObjectSchema<T>;
  canLeave?: boolean;
  shouldReset?: boolean;
  shouldResetKeep?: boolean;
  isModal?: boolean;
  modalProps?: Omit<FormModalProps, "formState">;
  disabled?: boolean;
}

export default function Form<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  error,
  onSubmit = () => {},
  canLeave = false,
  shouldReset = false,
  shouldResetKeep = false,
  isModal,
  modalProps,
  disabled = false,
  ...restProps
}: FormProps<T>) {
  const formOptions: UseFormProps<T> = {
    defaultValues,
    disabled,
    ...(schema && {
      resolver: yupResolver(schema) as unknown as Resolver<T>,
    }),
  };

  const methods = useForm<T>(formOptions);

  const { handleSubmit, reset } = methods;

  const prevDefaultValues = useRef(defaultValues);

  useEffect(() => {
    if (!defaultValues || methods.formState.isSubmitting) {
      return;
    }

    if (!deepEqual(defaultValues, prevDefaultValues.current)) {
      reset(defaultValues);
      prevDefaultValues.current = defaultValues;
    }
  }, [defaultValues, methods.formState.isSubmitting, reset]);

  const handleFormSubmit = async (values: T) => {
    // Protect the submit payload from mutation
    const submitPayload = structuredClone(values);

    await onSubmit(values);

    if (shouldResetKeep) {
      reset(submitPayload);
    } else if (shouldReset) {
      reset(defaultValues);
    }
  };

  const form = (
    <FormProvider {...methods}>
      <FormHelperContext.Provider
        value={{
          isFieldRequired: fieldName =>
            schema ? isFieldRequired(schema, fieldName) : false,
        }}>
        <FormCanLeave canLeave={canLeave}>
          <Box
            component="form"
            onSubmit={event => {
              event.preventDefault();
              handleSubmit(handleFormSubmit)(event);
              event.stopPropagation();
            }}
            autoComplete="off"
            {...restProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              ...restProps.sx,
            }}>
            {error && (
              <Grid size={{ xs: 12 }}>
                <Message severity="error" sx={{ mb: 3 }}>
                  {error}
                </Message>
              </Grid>
            )}
            {typeof children === "function" ? children(methods) : children}
          </Box>
        </FormCanLeave>
      </FormHelperContext.Provider>
    </FormProvider>
  );

  return isModal ? <FormModal {...modalProps}>{form}</FormModal> : form;
}
