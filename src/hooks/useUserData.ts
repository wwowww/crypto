import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/data/user';
import { User } from "@/types/db";

export const useUserData = (userId: string | null) => {
  const { updateUser } = useUserStore();

  const { data, isLoading, isError } = useQuery<User | null, Error>({
    queryKey: ['user', userId],
    queryFn: async (): Promise<User | null> => {
      if (!userId) return null;
      const data = await getUserInfo(userId);
      updateUser(data ?? null);
      return data ?? null;
    },
  });

  return { data, isLoading, isError };
};

export default useUserData;
