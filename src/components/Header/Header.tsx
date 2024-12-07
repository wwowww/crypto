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

const Header = () => {
  const { currency, setCurrency } = useCurrencyStore();
  
  return (
    <div className="flex items-center gap-5 h-[64px] pr-8 pl-7 border-b border-[#e5e7eb]">
      <h1>
        <Link href="/" className="flex items-center gap-2">
          <LogoSVG className="h-10 w-10" />
          <em className="w-[110px] text-xl tracking-tighter italic font-extrabold text-[#3d414b]">Coin Market</em>
        </Link>
      </h1>
      <nav className="w-full flex justify-between items-center">
        <ul className="flex gap-2">
          <li>거래소</li>
          <li>시장동향</li>
          <li>공지사항</li>
          <li>로그인</li>
        </ul>
        <Select 
          value={currency}
          onValueChange={(value: any) => setCurrency(value)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="KR" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'KRW'}>KR</SelectItem>
              <SelectItem value={'USD'}>EN</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </nav>
    </div>
  )
}

export default Header;