import { useUserStore } from "@/stores/useUserStore";
import { useLikedData } from "@/hooks/useLikedData";
import { createColumns } from './Columns';
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { useMarketData } from "@/hooks/useMarketData";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import CoinPagination from "./CoinPagination";

const LikedCoinsTable = () => {
  const user = useUserStore((state) => state.user);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data: likedCoinsData } = useLikedData({ userId: user?.id ?? '' });
  const { currency } = useCurrencyStore();
  const { coinListAll: data } = useMarketData({ currency });
  
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const columns = useMemo(() => createColumns(currency), [currency]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  
  useEffect(() => {
    if (likedCoinsData && data) {
      setFilteredData(
        data.filter((coin: any) => likedCoinsData.includes(coin.symbol))
      );
    }
  }, [likedCoinsData, data]);
  
  const table = useReactTable({
    data: filteredData || [],
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = table.getPageCount();

  const handlePageChange = (newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex,
    }));
  };
  
  return (
    <div className="pb-[120px]">
      <table className="w-full table-fixed">
        <thead>
          <TableHeader headerGroups={table.getHeaderGroups()} />
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td className="w-[1200px] flex flex-col items-center pt-[100px] pb-[160px] text-[20px] leading-[28px] text-[#93989e] border-b border-[#E5E3E5]">
                관심 자산이 없습니다. 거래소에서 하트를 눌러 추가해보세요.
              </td>
            </tr>
          ) : (
            <TableBody rows={table.getRowModel().rows} />
          )}
        </tbody>
      </table>
      {filteredData.length !== 0 && (
        <CoinPagination
          pageCount={pageCount}
          pageIndex={pagination.pageIndex}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default LikedCoinsTable