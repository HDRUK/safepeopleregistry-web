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

export type ExtendedUseFormReturn<T extends FieldValues> = UseFormReturn<T> & {
  isFieldRequired: (fieldName: keyof T) => boolean;
};

export interface FormProps<T extends AnyObject>
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  autoComplete?: "off";
  error?: ReactNode;
  onSubmit?: (values: T) => void;
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
    if (defaultValues && !deepEqual(defaultValues, prevDefaultValues.current)) {
      reset(defaultValues);
      prevDefaultValues.current = defaultValues;
    }
  }, [defaultValues, reset]);

  const extendedMethods: ExtendedUseFormReturn<T> = {
    ...methods,
    isFieldRequired: (fieldName: keyof T): boolean =>
      schema ? isFieldRequired(schema, fieldName as string) : false,
  };

  const handleFormSubmit = (values: T) => {
    onSubmit(values);

    if (shouldResetKeep) {
      reset(values);
    } else if (shouldReset) {
      reset(defaultValues);
    }
  };

  console.log("***** methods", methods.formState.errors);

  const form = (
    <FormProvider {...extendedMethods}>
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
            gap: 3,
            ...restProps.sx,
          }}>
          {error && (
            <Grid item xs={12}>
              <Message severity="error" sx={{ mb: 3 }}>
                {error}
              </Message>
            </Grid>
          )}
          {typeof children === "function"
            ? children(extendedMethods)
            : children}
        </Box>
      </FormCanLeave>
    </FormProvider>
  );

  return isModal ? <FormModal {...modalProps}>{form}</FormModal> : form;
}
