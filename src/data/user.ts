import { db } from "@/db";
import { user } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    })

    if (!existingUser) return null;

    return existingUser;
  } catch(error) {
    console.error(error, "error");
    throw new Error("문제가 발생했습니다.");
  }
}

export const getUserInfo = async (id: string) => {
  try {
    const userInfo = await db.query.user.findFirst({
      where: eq(user.id, id),
    });

    return userInfo;

  } catch (error) {
    console.error("유저 정보를 불러오지 못했습니다.", error);
  }
}