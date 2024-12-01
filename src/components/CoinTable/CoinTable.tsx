import { useState, useMemo } from 'react';
import { useReactTable, SortingState, getCoreRowModel } from '@tanstack/react-table';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useMarketData } from '@/hooks/useMarketData';
import { createColumns } from './Columns';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const CoinTable = () => {
  const { currency } = useCurrencyStore();
  const { coinListAll } = useMarketData({ currency });

  const data = useMemo(() => coinListAll || [], [coinListAll]);
  const columns = useMemo(() => createColumns(currency), [currency]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updaterOrValue) => {
      setSorting(updaterOrValue);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        <TableHeader headerGroups={table.getHeaderGroups()} />
      </thead>
      <tbody>
        <TableBody rows={table.getRowModel().rows} />
      </tbody>
    </table>
  );
};

export default CoinTable;