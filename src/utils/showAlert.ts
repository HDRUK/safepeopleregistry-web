import theme from "@/theme";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ShowAlertOptions } from "../types/common";

const notificationValues = [
  { type: "error", title: "Oh no! Something went wrong" },
  { type: "success", title: "Success!" },
  { type: "warning", title: "Just to warn you..." },
  { type: "info", title: "Something to note" },
  { type: "question", title: "Are you sure?" },
];

/**
 * Type must be one of the following: 'success' | 'error' | 'warning' | 'info' | 'question'
 * Show an alert
 * @param message The message to display
 */
export const showAlert = (
  type: SweetAlertIcon,
  options: ShowAlertOptions
): Promise<SweetAlertResult> | null => {
  const {
    cancelButtonText,
    confirmButtonText,
    text,
    title,
    willClose,
    untilDuration,
    id,
    ...restOptions
  } = options;

  const cookieName = `alert_${id}`;

  if (!untilDuration || !Cookies.get(cookieName)) {
    return withReactContent(Swal).fire({
      icon: type,
      ...(type === "info" && { iconColor: theme.palette.info.dark }),
      title:
        title ??
        notificationValues
          .filter(item => item.type === type)
          .map(item => item.title),
      confirmButtonColor: theme.palette.primary.main,
      confirmButtonText: confirmButtonText ?? "OK",
      denyButtonText: cancelButtonText,
      showDenyButton: !!cancelButtonText,
      allowOutsideClick: false,
      html: text,
      customClass: {
        container: "swal2-container",
      },
      willClose: () => {
        if (untilDuration) {
          Cookies.set(cookieName, "true", {
            expires: dayjs().add(untilDuration, "hour").toDate(),
          });
        }

        willClose?.();
      },
      ...restOptions,
    });
  }

  return null;
};

export const closeAlert = () => {
  Swal.close();
};

/**
 * Show a loading spinner and handle promise updates
 * @param promise A promise that resolves or rejects
 * @param loadingMessage The message to display while loading
 * @param successMessage The message to display upon success
 * @param errorMessage The message to display upon error
 */
export const showLoadingAlertWithPromise = async <T>(
  promise: Promise<T>,
  options: {
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: () => void;
    onError?: () => void;
  }
): Promise<T | void> => {
  const optionsWithDefaults = {
    loadingMessage: "Loading...",
    successMessage: "Operation completed successfully!",
    errorMessage: "Something went wrong. Please try again.",
    ...options,
  };

  // Show loading spinner
  withReactContent(Swal).fire({
    title: optionsWithDefaults.loadingMessage,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Wait for the promise to resolve
    const result = await promise;

    // Show success message
    withReactContent(Swal).fire({
      icon: "success",
      title: "Success",
      text: optionsWithDefaults.successMessage,
      confirmButtonColor: "#7A89C2",
      willClose: () => options?.onSuccess?.(),
    });

    return result;
  } catch (_) {
    // Show error message
    withReactContent(Swal).fire({
      icon: "error",
      title: "Error",
      text: optionsWithDefaults.errorMessage,
      confirmButtonColor: "#7A89C2", // Customize button color (optional)
      willClose: () => options?.onError?.(),
    });
    return undefined;
  }
};
