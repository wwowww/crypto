import { useQuery } from '@tanstack/react-query';
import { getUserLikes } from "@/data/liked";

export const useLikedData = ({ userId }: {userId: string}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['likedCoins', userId],
    queryFn: async () => {
      const data = await getUserLikes(userId);

      return data;
    }
  })

  return {
    data,
    isLoading,
    isError,
  };
}