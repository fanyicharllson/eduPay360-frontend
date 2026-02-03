import { useMutation } from "@tanstack/react-query";
import api from "@/hooks/useApi";

export interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation<ApiResponse<AuthResponse>, unknown, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/auth/login", payload);
      console.log("Login response data: ", res.data);
      return res.data;
    },
  });
}
