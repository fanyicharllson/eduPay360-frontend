import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./useApi";

export function useRegisterSchool() {
  return useMutation<ApiResponse<SchoolResponseDto>, unknown, SchoolRequestDto>(
    {
      mutationFn: async (school: SchoolRequestDto) => {
        const res = await api.post("/schools/register", school);
        console.log("Register school data: ", res.data);
        return res.data;
      },
    },
  );
}

export function useGetSchool(publicId: number | string | undefined) {
  return useQuery({
    queryKey: ["school", publicId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SchoolResponseDto>>(
        `/schools/public/${publicId}`,
      );
      console.log("School data gotten throught public id ", res.data)
      return res.data;
    },
    enabled: !!publicId,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
