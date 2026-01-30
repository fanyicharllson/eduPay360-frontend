import { useQuery } from "@tanstack/react-query";
import  api from "./useApi";

export interface OnboardingStatus {
  onboardingState: string;
  emailVerified: boolean;
  passwordSet: boolean;
  completed: boolean;
  email?: string;
}

export function useOnboardingStatus(options?: { enabled?: boolean }) {
  return useQuery<OnboardingStatus, Error>({
    queryKey: ["onboarding-status"],
    queryFn: async () => {
      const res = await api.get("/auth/onboarding/status");
      if (!res.data?.success) throw new Error(res.data?.message || "Failed to fetch onboarding status");
      return res.data.data;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
}
