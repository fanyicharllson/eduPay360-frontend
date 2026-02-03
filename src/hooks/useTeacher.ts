import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useApi";
import { toast } from "@/lib/toast";
import { getErrorMessage } from "./useGetErrorMessage";

export interface TeacherSubjectDto {
  id: number;
  name: string;
  code: string;
}

export interface TeacherResponseDto {
  id: number;
  name: string;
  publicId: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  isActive: boolean;
  subjects: TeacherSubjectDto[];
}

export interface TeacherRequestDto {
  name: string;
  email: string;
  phone?: string;
  subjectIds?: number[];
}

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TeacherResponseDto[]>>("/teachers");
      return res.data;
    },
  });
}

export function useTeacherByPublicId(publicId: string | undefined) {
  return useQuery({
    queryKey: ["teacher", publicId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TeacherResponseDto>>(
        `/teachers/public/${publicId}`,
      );
      return res.data;
    },
    enabled: !!publicId,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TeacherRequestDto) => {
      const res = await api.post<ApiResponse<TeacherResponseDto>>(
        "/teachers",
        data,
      );
      return res.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher invited successfully", {
        description: `Verification email sent to ${response.data.email}`,
      });
    },
    onError: (error) => {
      toast.error("Failed to invite teacher", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const res = await api.delete<ApiResponse<void>>(`/teachers/${id}`);
      return res.data;
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.removeQueries({ queryKey: ["teacher", deletedId] });
      toast.success("Teacher removed successfully");
    },
    onError: (error) => {
      toast.error("Failed to remove teacher", {
        description: getErrorMessage(error),
      });
    },
  });
}
