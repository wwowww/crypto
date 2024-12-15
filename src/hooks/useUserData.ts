import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/data/user';

export const useUserData = (userId: string | null) => {
  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const data = await getUserInfo(userId);
      
      return data;
    }
  })

  return { data };
};

export default useUserData;
