import { db } from "@/db";
import { verifySession } from "./sessions";
import { like } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const addLike = async (symbol: string) => {
  const session = await verifySession();
  const userId = session.id;

  const existingLike = await db
    .select()
    .from(like)
    .where(and(eq(like.userId, userId), eq(like.coinSymbol, symbol)))
    .limit(1);

  if (existingLike.length === 0) {
    await db.insert(like).values({
      userId,
      coinSymbol: symbol,
    });
  }
};

export const removeLike = async (symbol: string) => {
  const session = await verifySession();
  const userId = session.id;

  await db
    .delete(like)
    .where(and(eq(like.userId, userId), eq(like.coinSymbol, symbol)));
};

export const checkLike = async (symbol: string) => {
  const session = await verifySession();
  const userId = session.id;

  const existingLike = await db
    .select()
    .from(like)
    .where(and(eq(like.userId, userId), eq(like.coinSymbol, symbol)))
    .limit(1);

  return existingLike.length > 0;
};