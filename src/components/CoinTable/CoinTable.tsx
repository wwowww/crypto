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

  // console.log(data, "data")
  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: '가상자산명',
        cell: (info) => {
          const coin = info.row.original;
          return (
            <div className='flex items-center'>
              <img
                src={coin.image}
                alt={coin.name}
                className='w-6 h-6'
              />
              <span>{coin.name}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('current_price', {
        header: '현재가',
        cell: (info) => `${formatCurrency(info.getValue(), currency)}`,
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

          return `${formatCurrency(Number(formattedChange), currency)} (${percentage.toFixed(2)}%)`;
        },
      }),
      columnHelper.accessor('total_volume', {
        header: '거래 금액(24H)',
        cell: (info) => `≈ ${formatCurrency(info.getValue(), currency)}`,
      }),
      columnHelper.accessor('market_cap', {
        header: '시가총액',
        cell: (info) => formatMarketCapPrice(Number(info.getValue()), currency),
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

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className='cursor-pointer'
              >
                <div className='flex items-center gap-2 text-gray-color'>
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
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
