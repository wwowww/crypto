import { createColumnHelper } from '@tanstack/react-table';
import { formatCurrency, formatMarketCapPrice } from "@/utils/formatPrice";
import LikeButton from '@/components/Button/LikeButton';

export const createColumns = (currency: string) => {
  const columnHelper = createColumnHelper<any>();

  return [
    columnHelper.accessor('name', {
      header: '자산',
      cell: (info) => {
        const coin = info.row.original;

        return (
          <div className='flex items-center gap-3 pl-3'>
            <LikeButton coinSymbol={coin.symbol} />
            <div>
              <h3 className='font-medium text-[12px] text-[#3d414b] line-clamp-2'>{coin.name}</h3>
              <span className='text-[11px] text-[#acb0b4]'>{coin.symbol.toUpperCase()}</span>
            </div>
          </div>
        );
      },
      filterFn: (row, filterValue) => {
        const nameValue = row.getValue('name')?.toString().toLowerCase() || '';
        const symbolValue = row.getValue('symbol')?.toString().toLowerCase() || '';
        const filter = filterValue.toLowerCase();

        return nameValue.includes(filter) || symbolValue.includes(filter);
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
          <div className={`text-[12px] ${textColor}`}>
            {formatCurrency(price, currency)}
          </div>
        );
      },
    }),
    columnHelper.accessor(row => ({
      change: row.price_change_24h,
      percentage: row.price_change_percentage_24h,
    }), {
      id: 'priceChange',
      header: '변동률(24H)',
      cell: (info) => {
        const { change, percentage } = info.getValue();
        const isNegative = change < 0;
        const sign = isNegative ? '' : '+';
        const textColor = isNegative ? 'text-blue-500' : 'text-red-500';

        return (
          <div className={`text-[12px] pr-2 ${textColor}`}>
            {sign}{percentage.toFixed(2)}%
          </div>
        );
      },
    }),
    columnHelper.accessor('total_volume', {
      header: '거래금액(24H)',
      cell: (info) => <div className='pr-3 text-[#3d414b] text-[12px]'>{formatMarketCapPrice(info.getValue(), currency)}</div>,
    }),
  ];
};
