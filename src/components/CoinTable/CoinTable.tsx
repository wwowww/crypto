import { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import TriangleSVG from '@/components/TriangleSVG/TriangleSVG';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useMarketData } from '@/hooks/useMarketData';
import { formatMarketCapPrice, formatCurrency } from "@/utils/formatPrice";

const CoinTable = () => {
  const { currency } = useCurrencyStore();
  const { coinListAll } = useMarketData({ currency });

  const data = useMemo(() => coinListAll || [], [coinListAll]);

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: '가상자산명',
        cell: (info) => {
          const coin = info.row.original;
          return (
            <div className='flex items-center gap-3'>
              <img
                src={coin.image}
                alt={coin.name}
                className='w-10 h-10 rounded-full bg-[#edeef0] object-contain'
              />
              <div>
                <h3 className='font-medium text-[17px] leading-[25px] text-[#3d414b]'>{coin.name}</h3>
                <span className='text-[14px] leading-[21px] text-[#acb0b4]'>{coin.symbol.toUpperCase()}</span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('current_price', {
        header: '현재가',
        cell: (info) => {
          const coin = info.row.original;
          const price = coin.current_price;
          const priceChange = coin.price_change_24h;

          const isNegative = priceChange < 0;   
          const textColor = isNegative ? 'text-blue-500' : 'text-red-500';       

          return (
            <div className={`text-[17px] ${textColor}`}>
              {formatCurrency(price, currency)}
            </div>
          )
        },
      }),
      columnHelper.accessor(row => ({
        change: row.price_change_24h,
        percentage: row.price_change_percentage_24h,
      }), {
        id: 'priceChange',
        header: '24시간 변동률',
        cell: (info) => {
          const { change, percentage } = info.getValue();
          const formattedChange = change < 1000 ? change.toFixed(4) : Math.floor(change);
          const isNegative = change < 0;
          const sign = isNegative ? '' : '+';
          const textColor = isNegative ? 'text-blue-500' : 'text-red-500';

          return (
            <div className={`relative mr-4 text-[17px] ${textColor}`}>
              {sign}{formatCurrency(Number(formattedChange), currency)} ({sign}{percentage.toFixed(2)}%)
              <span
                className={`absolute right-[-14px] top-0 transform -translate-y-1/2 
                ${isNegative ? 'after:border-b-[#4386f9]' : 'after:border-b-[#f75457]'} 
                after:content-[''] after:border-r-[5px] after:border-l-[5px] after:border-transparent after:border-b-[7px]`}
              />
            </div>
          )
        },
      }),
      columnHelper.accessor('total_volume', {
        header: '거래 금액(24H)',
        cell: (info) => <div className='text-[#3d414b] text-[17px]'>≈ {formatCurrency(info.getValue(), currency)}</div>,
      }),
      columnHelper.accessor('market_cap', {
        header: '시가총액',
        cell: (info) => <div className='text-[#3d414b] text-[17px]'>{formatMarketCapPrice(Number(info.getValue()), currency)}</div>,
      }),
    ],
    [currency]
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const getColumnAlignmentClass = (index: number) => {
    if (index === 0) {
      return 'justify-start';
    } else if (index === 1) {
      return 'justify-center';
    } else {
      return 'justify-end'; 
    }
  };

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const isFirst = index === 0;
              const isLast = index === headerGroup.headers.length - 1;
        
              return (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className={`cursor-pointer pt-4 pb-4 bg-[#f8f9fa]
                          ${isFirst ? 'first:rounded-l-[10px] first:pl-5' : ''} 
                          ${isLast ? 'last:rounded-r-[10px] last:pr-5' : ''}`}
              >
                <div className={`flex gap-2 items-center text-gray-color text-sm leading-[22px] font-normal ${getColumnAlignmentClass(index)}`}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div className='flex flex-col gap-0.5'>
                    <button>
                      <TriangleSVG color={header.column.getIsSorted() === 'asc' ? '#636363' : '#b5b5b5'} />
                    </button>
                    <button
                      className='transform rotate-180'
                    >
                      <TriangleSVG color={header.column.getIsSorted() === 'desc' ? '#636363' : '#b5b5b5'} />
                    </button>
                  </div>
                </div>
              </th>
              )  
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className='gap-0.5'>
            {row.getVisibleCells().map((cell, index) => (
              <td key={cell.id}>
                <div className={`flex h-[88px] items-center ${getColumnAlignmentClass(index)}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
