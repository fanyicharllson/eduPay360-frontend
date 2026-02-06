import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useApi";
import { toast } from "@/lib/toast";
import { getErrorMessage } from "./useGetErrorMessage";

export interface ClassResponseDto {
  id: number;
  publicId: string;
  name: string;
  academicYear: string;
  classTeacherId: number;
  classTeacherName: string;
  room: string;
  capacity: number;
  studentCount: number;
  isActive: boolean;
}

export interface ClassRequestDto {
  name: string;
  academicYear: string;
  classTeacherId?: number | null;
  room?: string;
  capacity: number;
  clientClassId?: string;
}





export function useClasses(academicYear?: string) {
  return useQuery({
    queryKey: ["classes", academicYear],
    queryFn: async () => {
      const params = academicYear ? { academicYear } : {};
      const res = await api.get<ApiResponse<ClassResponseDto[]>>("/classes", { params });
      return res.data;
    },
  });
}

export function useClass(id: number | string | undefined) {
  return useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ClassResponseDto>>(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ClassRequestDto) => {
      const res = await api.post<ApiResponse<ClassResponseDto>>("/classes", data);
      console.log("Create class response: ", res.data);
      return res.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Class created successfully", {
        description: `${response.data.name} - ${response.data.academicYear}`,
      });
    },
    onError: (error) => {
      toast.error("Failed to create class", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number | string } & Partial<ClassRequestDto>) => {
      const res = await api.put<ApiResponse<ClassResponseDto>>(`/classes/${id}`, data);
      return res.data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["class", variables.id] });
      toast.success("Class updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update class", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (publicId: number | string) => {
      const res = await api.delete<ApiResponse<void>>(`/classes/public/${publicId}`);
      return res.data;
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.removeQueries({ queryKey: ["class", deletedId] });
      toast.success("Class deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete class", {
        description: getErrorMessage(error),
      });
    },
  });
}