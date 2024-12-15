import { useState, useEffect } from 'react';
import { addLike, removeLike, checkLike } from "@/actions/likes"; // 서버 사이드 함수들
import HeartSVG from '@/components/svg/HeartSVG/HeartSVG';
import { debounce } from 'lodash';
import { useUserStore } from '@/stores/useUserStore';
import useUserData from '@/hooks/useUserData';

interface LikeButtonProps {
  coinSymbol: string;
}

const LikeButton = ({ coinSymbol }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const user = useUserStore((state) => state.user);

  const userId = user?.id ?? null;
  const { data } = useUserData(userId);
  
  const checkIfLiked = debounce(async (symbol: string) => {
    const liked = await checkLike(symbol);
    liked !== null && setIsLiked(liked);
  }, 500);

  useEffect(() => {
    if (coinSymbol) {
      checkIfLiked(coinSymbol);
    }
  }, [coinSymbol, checkIfLiked]);

  if (data === null || user === null) return null;

  const handleLikeToggle = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    try {
      if (newLikedState) {
        await addLike(coinSymbol);
      } else {
        await removeLike(coinSymbol);
      }
    } catch (error) {
      setIsLiked(isLiked);
      console.error(error, "LikeButton 업데이트에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button onClick={handleLikeToggle} disabled={isUpdating}>
      <HeartSVG color={isLiked ? '#EF4444' : '#ACB0B4'} />
    </button>
  );
};

export default LikeButton;
