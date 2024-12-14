"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { verifySession, deleteSession } from "@/actions/sessions";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const deleteAccount = async () => {
  try {
    const session = await verifySession();
    if (!session || !session.id) {
      return { errorMessage: "로그인 상태가 아닙니다. 다시 로그인 해주세요." };
    }

    const existingUser = await db.select().from(user).where(eq(user.id, session.id)).limit(1);
    
    if (!existingUser.length) {
      return { errorMessage: "존재하지 않는 사용자입니다." };
    }

    await db.delete(user).where(eq(user.id, session.id));

    await deleteSession();

  } catch (error) {
    console.error(error);
  }


  redirect("/login"); 
}
