import { useQuery } from "@tanstack/react-query";
import api from "@/hooks/useApi";

export function useCurrentUser() {
  return useQuery<ApiResponse<SchoolResponseDto>>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: false,
  });
}
