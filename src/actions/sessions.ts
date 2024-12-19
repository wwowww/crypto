"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  name: string;
  email: string;
}

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

export const verify = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("토큰 검증에 실패하였습니다.", error);
  }
};

export const createSession = async(payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  })
}

export const deleteSession = async () => {
  (await cookies()).delete("session");
}

export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    return null;
  }

  return session;
}