import { useMutation } from "@tanstack/react-query";
import api from "@/hooks/useApi";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
  });
}
