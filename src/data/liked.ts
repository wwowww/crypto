import { db } from "@/db";
import { like } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserLikes = async (userId: string): Promise<string[] | null> => {
  if (!userId || userId.trim() === "") return null;

  try {
    const userLikes = await db.query.like.findMany({
      where: eq(like.userId, userId),
    });

    return userLikes.map((likeRecord) => likeRecord.coinSymbol);
  } catch (error) {
    console.error("좋아요 데이터를 불러오는데 실패했습니다.", error);
    throw new Error("좋아요 데이터를 불러오는데 문제가 발생했습니다.");
  }
};
