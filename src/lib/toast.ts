import { toast as sonnerToast } from "sonner";

export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface AppToastOptions {
  description?: string;
  position?: ToastPosition;
}

const DEFAULT_POSITION: ToastPosition = "top-right";

export const toast = {
  success: (message: string, options?: AppToastOptions) =>
    sonnerToast.success(message, {
      description: options?.description,
      position: options?.position || DEFAULT_POSITION,
      ...options,
    }),
  error: (message: string, options?: AppToastOptions) =>
    sonnerToast.error(message, {
      description: options?.description,
      position: options?.position || DEFAULT_POSITION,
      ...options,
    }),
  info: (message: string, options?: AppToastOptions) =>
    sonnerToast(message, {
      description: options?.description,
      position: options?.position || DEFAULT_POSITION,
      ...options,
    }),
  custom: sonnerToast,
};
