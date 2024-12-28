import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | Coin Market",
  description: "Coin Market에 오신 것을 환영합니다. 로그인 후 이용해주세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
