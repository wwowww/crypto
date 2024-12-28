import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 | Coin Market",
  description: "Coin Market에 오신 것을 환영합니다. 회원가입 후 이용해주세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
