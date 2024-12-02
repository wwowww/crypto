import { useState, useMemo } from 'react';
import { useReactTable, SortingState, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useMarketData } from '@/hooks/useMarketData';
import { createColumns } from './Columns';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SearchIcon from '@image/icon-search.svg';

const CoinTable = () => {
  const { currency } = useCurrencyStore();
  const { coinListAll, trendingCoin } = useMarketData({ currency });

  const [activeTab, setActiveTab] = useState<string>('all'); 
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

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
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filteredData = table.getFilteredRowModel().rows;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div className="flex space-x-4">
          <button
            className={` rounded-[8px] border py-[7px] px-[15px] text-[13px] ${activeTab === 'all' ? 'text-[#3d414b] border-[#3d414b]' : 'text-[#707882] border-[#e2e4e7]'}`}
            onClick={() => handleTabClick('all')}
          >
            All
          </button>
          <button
            className={` rounded-[8px] border  py-[7px] px-[15px] text-[13px] ${activeTab === 'trending' ? 'text-[#3d414b] border-[#3d414b]' : 'text-[#707882] border-[#e2e4e7]'}`}
            onClick={() => handleTabClick('trending')}
          >
            Trending
          </button>
        </div>
        <div className="relative">
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pt-[7px] pr-[15px] pb-[6px] pl-[32px] font-lg shadow border border-block"
            placeholder="가상자산명 또는 심볼 검색"
          />
          <SearchIcon className="absolute top-2.5 left-2" />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <TableHeader headerGroups={table.getHeaderGroups()} />
        </thead>
        <tbody>
          {filteredData.length === 0 && globalFilter ? (
            <tr>
              <td className="flex flex-col items-center pt-[200px] text-[20px] leading-[28px] text-[#93989e]">
                검색된 가상 자산이 없습니다.
              </td>
            </tr>
          ) : (
            <TableBody rows={table.getRowModel().rows} />
          )}
        </tbody>
      </table>
    </>
  );
};

export default CoinTable;
