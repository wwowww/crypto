import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/data/user';

export const useUserData = (userId: string | null) => {
  const { updateUser } = useUserStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const data = await getUserInfo(userId);
      return data;
    },
    onSuccess: (data: any) => {
      if (data) {
        updateUser(data);
      }
    },
  });

  return { data, isLoading, isError };
};

export default useUserData;
