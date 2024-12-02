import { useState, useMemo } from 'react';
import { useReactTable, SortingState, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useMarketData } from '@/hooks/useMarketData';
import { createColumns } from './Columns';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TabMenu from '@/components/TabMenu/TabMenu';
import SearchFilter from '@/components/SearchFilter/SearchFilter';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CoinTable = () => {
  const { currency } = useCurrencyStore();
  const { coinListAll, trendingCoin } = useMarketData({ currency });

  const [activeTab, setActiveTab] = useState<string>('all');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const data = useMemo(() => {
    switch (activeTab) {
      case 'trending':
        return trendingCoin || [];
      default:
        return coinListAll || [];
    }
  }, [activeTab, coinListAll, trendingCoin]);

  const columns = useMemo(() => createColumns(currency), [currency]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filteredData = table.getFilteredRowModel().rows;
  const pageCount = table.getPageCount();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setPagination(prev => {
      let newPageIndex = prev.pageIndex;
      if (direction === 'prev') {
        newPageIndex = Math.max(0, prev.pageIndex - 1);
      } else if (direction === 'next') {
        newPageIndex = Math.min(pageCount - 1, prev.pageIndex + 1);
      }
      return { ...prev, pageIndex: newPageIndex };
    });
  };

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <TabMenu activeTab={activeTab} onTabClick={handleTabClick} />
        <SearchFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      <table className="w-full">
        <thead>
          <TableHeader headerGroups={table.getHeaderGroups()} />
        </thead>
        <tbody>
          {filteredData.length === 0 && globalFilter ? (
            <tr>
              <td className="w-[246%] flex flex-col items-center pt-[200px] pb-[160px] text-[20px] leading-[28px] text-[#93989e]">
                검색된 가상 자산이 없습니다.
              </td>
            </tr>
          ) : (
            <TableBody rows={table.getRowModel().rows} />
          )}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.pageIndex > 0) {
                    handlePageChange('prev');
                  }
                }}
              />
            </PaginationItem>

            {/* 페이지 번호 표시 */}
            {Array.from({ length: pageCount }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPagination(prev => ({
                      ...prev,
                      pageIndex: index,
                    }));
                  }}
                  isActive={index === pagination.pageIndex}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.pageIndex < pageCount - 1) {
                    handlePageChange('next');
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default CoinTable;
