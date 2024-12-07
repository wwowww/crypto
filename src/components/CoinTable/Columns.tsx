import { createColumnHelper } from '@tanstack/react-table';
import { formatCurrency, formatMarketCapPrice } from "@/utils/formatPrice";

export const createColumns = (currency: string) => {
  const columnHelper = createColumnHelper<any>();

  return [
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
      filterFn: (row, columnId, filterValue) => {
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
          <div className={`text-[17px] ${textColor}`}>
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
      header: '24시간 변동률',
      cell: (info) => {
        const { change, percentage } = info.getValue();
        const formattedChange = change < 1000 ? change.toFixed(2) : Math.floor(change);
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
        );
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
  ];
};
