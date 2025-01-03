import { flexRender } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import Link from "next/link";
import { range } from 'lodash';

interface TableBodyProps {
  rows: any[];
  isNav?: boolean;
}

const TableBody = ({ rows, isNav=false }: TableBodyProps) => {
  const getColumnAlignmentClass = (index: number) => {
    if (index === 0) {
      return 'justify-start';
    } else if (index === 1 && !isNav) {
      return 'justify-center';
    } else {
      return 'justify-end';
    }
  };

  const getColumnChildrenRoundedClass = (index: number) => {
    if (index === 0 && !isNav) {
      return 'rounded-tl-[8px] rounded-bl-[8px]';
    } else if (index === 4&& !isNav) {
      return 'rounded-tr-[8px] rounded-br-[8px]';
    } else {
      return '';
    }
  };

  return rows.length !== 0 ? (
    rows.map((row) => (
      
      <tr key={row.id} className="group hover:bg-[#f6f7f8]">
        {row.getVisibleCells().map((cell: any, cellIndex: number) => (
          <td
            key={cell.id}
            className={`${isNav ? 'px-0 py-0 leading-[14px] border-b border-[#eee] w-1/4' : 'px-4 py-2'} ${getColumnChildrenRoundedClass(cellIndex)}`}
          >
            {cellIndex === 0 ? (
              <div className={`flex items-center ${getColumnAlignmentClass(cellIndex)} ${isNav ? 'h-[50px]' : 'h-[88px]'}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ) : (
              <Link href={`/${cell.row.original.symbol}`}>
                <div className={`flex items-center ${getColumnAlignmentClass(cellIndex)} ${isNav ? 'h-[50px] text-right' : 'h-[88px]'}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </Link>
            )}
          </td>
        ))}
      </tr>
    ))
  ) : (
    range(0, 14)?.map((item: number) => (
      <tr key={"key"+item}>
        <td className={`flex items-center space-x-4 ${isNav ? 'px-2 py-0 h-14' : 'px-4 py-2 h-[105px]'}`}>
          {isNav ? '' : <Skeleton className="h-10 w-[50px] rounded-full" />}
          <div className={isNav ? 'space-y-1' : 'space-y-2'}>
            <Skeleton className={isNav ? 'h-2 w-[200px]' : 'h-4 w-[450px]'} />
            <Skeleton className={isNav ? 'h-2 w-[150px]' : 'h-4 w-[400px]'} />
          </div>
        </td>
      </tr>
    ))
  );
};

export default TableBody;
