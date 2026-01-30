import { useMutation } from "@tanstack/react-query";
import api from "./useApi";

export function useVerifyOtp(onSuccess?: (email: string) => void) {
  return useMutation<VerifyOtpResponse, unknown, VerifyOtpRequest>({
    mutationFn: async (payload) => {
      const response = await api.post("/auth/verify-code", payload);
      console.log("Data backend sent from verifying otp:  ", response.data)
      return response.data;
    },
    onSuccess: (data: VerifyOtpResponse, variables: VerifyOtpRequest) => {
      if (data.success) {
        if (onSuccess) onSuccess(variables.email);
      }
    },
  });
}

export function useResendOtp() {
  return useMutation<VerifyOtpResponse, unknown, { email: string }>({
    mutationFn: async (payload) => {
      const response = await api.post("/auth/resend-code", payload);
      return response.data;
    },
  });
}
