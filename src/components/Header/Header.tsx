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
    <div className="flex items-center gap-5 h-[64px] pr-8 pl-7 border-b border-[#e5e7eb]">
      <h1>
        <Link href="/" className="flex items-center gap-2">
          <LogoSVG className="h-10 w-10" />
          <em className="w-[110px] text-xl tracking-tighter italic font-extrabold text-[#3d414b]">Coin Market</em>
        </Link>
      </h1>
      <nav className="w-full flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/btc">
            <span className="text-4 font-medium">거래소</span>
          </Link>
          {user?.id === "" || user === null ? (
            <Link href="/login">
              <span className="text-4 font-medium">로그인</span>
            </Link>
          ) : (
            <LogoutModalButton />
          )}
        </div>
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
      </nav>
    </div>
  )
}

export default Header;