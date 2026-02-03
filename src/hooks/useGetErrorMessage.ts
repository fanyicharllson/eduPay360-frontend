import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message || error.message || "An error occurred"
    );
  }
  return "An unexpected error occurred";
};
