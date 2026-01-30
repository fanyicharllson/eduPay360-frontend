import { useMutation } from "@tanstack/react-query";
import api from "./useApi";

export function useRegisterSchool() {
  return useMutation<ApiResponse<SchoolResponseDto>, unknown, SchoolRequestDto>(
    {
      mutationFn: async (school: SchoolRequestDto) => {
        const res = await api.post("/schools/register", school);
        return res.data;
      },
    },
  );
}
