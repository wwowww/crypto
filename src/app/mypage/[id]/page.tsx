'use client';

import LogoutModalButton from "@/components/auth/LogoutModalButton";
import DeleteAccountButton from "@/components/Button/DeleteAccountButton";
import LikedCoinsTable from "@/components/CoinTable/LikedCoinsTable";
import AccountTable from "@/components/UserInfo/AccountTable";
import { useUserStore } from "@/stores/useUserStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const MyPage = () => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || user?.id === '') {
      redirect("/");
    }
  }, [user]);
  
  return (
    <>
      <div>
        <h3 className="mb-[38px] text-[24px] font-medium tracking-normal text-[#1b1b1b]">
          회원정보
        </h3>
        <AccountTable />
      </div>
      <div className="flex justify-end gap-3 pt-[20px] mb-[120px]">
        <LogoutModalButton className="py-2 px-4 text-white font-semibold bg-[#1b2b3b] hover:bg-[#e15241] transition duration-200 ease rounded" />
        <DeleteAccountButton className="py-2 px-4 text-white font-semibold bg-[#5d6570] hover:bg-[#e15241] transition duration-200 ease rounded" />
      </div>

      <div>
        <h3 className="mb-[38px] text-[24px] font-medium tracking-normal text-[#1b1b1b]">
          관심 자산
        </h3>
        <LikedCoinsTable />
      </div>
    </>
  )
}

export default MyPage;