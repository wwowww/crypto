import bcrypt from 'bcryptjs';
import { db } from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from '@/data/user';

export const signUp = async (_: any, formData: FormData) => {
  const validatedFields = SignUpSchema.safeParse({ // safeParse를 사용해 폼 데이터에 있는 필드 값을 넣어줌
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if(!validatedFields.success) {
    return {
      errorMessage: "잘못 입력된 값이 있습니다."
    }
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자입니다."
      }
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 3. insert db
    await db.insert(user).values({ name, email, password: hashedPassword })

  } catch(error) {
    console.error(error, "error");
    return { errorMessage: "문제가 발생했습니다." }
  }

  redirect("/login");
}
