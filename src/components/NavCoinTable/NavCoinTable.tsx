import { useState, useMemo } from 'react';
import { useReactTable, SortingState, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useMarketData } from '@/hooks/useMarketData';
import { createColumns } from './Columns';
import TableHeader from '@/components/CoinTable/TableHeader';
import TableBody from '@/components/CoinTable/TableBody';
import SearchFilter from '@/components/SearchFilter/SearchFilter';

const NavCoinTable = () => {
  const { currency } = useCurrencyStore();
  const { coinListAll } = useMarketData({ currency });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const data = useMemo(() => coinListAll || [], [coinListAll]);
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
  return (
    <div className='w-[358px]'>
      <div className='flex justify-between items-center mb-4'>
        <SearchFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} isNav />
      </div>
      <div className='h-[calc(100vh-170px)] overflow-y-scroll border-b border-[#eee]'>
        <table className="w-full table-fixed border-collapse border border-[#eee]">
          <thead className='relative top-0 w-full'>
            <TableHeader headerGroups={table.getHeaderGroups()} isNav />
          </thead>
          <tbody>
            {filteredData.length === 0 && globalFilter ? (
              <tr className=''>
                <td className="w-[350px] h-[calc(100vh-206px)] flex flex-col items-center pt-[200px] pb-[160px] text-4 leading-[28px] text-[#93989e]">
                  검색된 가상 자산이 없습니다.
                </td>
              </tr>
            ) : (
              <TableBody rows={table.getRowModel().rows} isNav />
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default NavCoinTable;
