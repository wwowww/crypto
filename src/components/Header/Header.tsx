'use client';

import LogoSVG from "@image/coin.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { useUserStore } from "@/stores/useUserStore";
import LogoutModalButton from "../auth/LogoutModalButton";

const Header = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const user = useUserStore((state) => state.user);
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb]">
      <div className="flex gap-5 items-center h-16 justify-between mx-auto px-[32px] py-0 w-[1264px]">
        <h1>
          <Link href="/" className="flex items-center gap-2">
            <LogoSVG className="h-10 w-10" />
            <em className="w-[110px] text-xl tracking-tighter italic font-extrabold text-[#3d414b]">Coin Market</em>
          </Link>
        </h1>
        <nav className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <Link href="/btc">
              <span className="text-4 font-medium p-2">거래소</span>
            </Link>
            {user?.id === "" || user === null ? (
              <Link href="/login">
                <span className="text-4 font-medium">로그인</span>
              </Link>
            ) : (
              <LogoutModalButton />
            )}
          </div>
          <div className="flex gap-3">
            {user?.id === "" || user === null ? (
              <></>
            ) : (
              <Link href={`/mypage/${user?.id}`}>
                <span className="text-4 font-medium w-9 h-9 text-center flex items-center justify-center text-white bg-[#83a7bd] rounded-full">{user?.name?.charAt(0)}</span>
              </Link>
            )}
            <Select 
              value={currency}
              onValueChange={(value: any) => setCurrency(value)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="KRW" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'KRW'}>KRW</SelectItem>
                  <SelectItem value={'USD'}>USD</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;