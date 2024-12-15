"use client";

import { useUserStore } from "@/stores/useUserStore";
import useUserData from "@/hooks/useUserData";

const AccountTable = () => {
  const user = useUserStore((state) => state.user);

  return (
    <table className="w-full border-t border-b border-[#e5e5e5]">
      <caption className="relative">
        <span className="absolute top-0.5 w-px h-px m-[-1px] overflow-hidden">
          회원정보 - 기본정보 테이블
        </span>
      </caption>
      <colgroup>
        <col width="180" />
      </colgroup>
      <tbody>
        {user && (
          <>
            <tr className="border-t border-b border-[#e5e5e5]">
              <th className="bg-[#fafafa] py-4 px-6 text-[16px] text-[#777] text-left">id</th>
              <td className="text-[#444] py-4 px-6 truncate">{user?.id}</td>
            </tr>
            <tr className="border-t border-b border-[#e5e5e5]">
              <th className="bg-[#fafafa] py-4 px-6 text-[16px] text-[#777] text-left">name</th>
              <td className="text-[#444] py-4 px-6 truncate">{user?.name}</td>
            </tr>
            <tr className="border-t border-b border-[#e5e5e5]">
              <th className="bg-[#fafafa] py-4 px-6 text-[16px] text-[#777] text-left">email</th>
              <td className="text-[#444] py-4 px-6 truncate">{user?.email}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default AccountTable;
