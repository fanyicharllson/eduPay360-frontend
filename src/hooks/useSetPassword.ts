import { useMutation } from '@tanstack/react-query';
import api from './useApi';

export function useSetPassword() {
  return useMutation<SetPasswordApiResponse, unknown, SetPasswordRequest>({
    mutationFn: async (payload: SetPasswordRequest) => {
      const res = await api.post('/auth/set-password', payload);
      console.log("Data backend sent after setting password:  ", res.data)
      return res.data;
    },
  });
}
