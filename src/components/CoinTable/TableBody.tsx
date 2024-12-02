import { flexRender } from '@tanstack/react-table';
import Link from "next/link";

interface TableBodyProps {
  rows: any[];
}

const TableBody = ({ rows }: TableBodyProps) => {
  const getColumnAlignmentClass = (index: number) => {
    if (index === 0) {
      return 'justify-start';
    } else if (index === 1) {
      return 'justify-center';
    } else {
      return 'justify-end'; 
    }
  };

  const getColumnChildrenRoundedClass = (index: number) => {
    if (index === 0) {
      return 'rounded-tl-[8px] rounded-bl-[8px]'
    } else if (index === 4) {
      return 'rounded-tr-[8px] rounded-br-[8px]'
    } else {
      return '';
    }
  }

  return (
    <>
      {rows.map((row) => (
        <tr key={row.id} className="group hover:bg-[#f6f7f8]">
          {row.getVisibleCells().map((cell: any, index: number) => (
            <td key={cell.id} className={`px-4 py-2 mt-2 ${getColumnChildrenRoundedClass(index)}`}>
              <Link href={`${cell.row.original.id}`}>
                <div className={`flex h-[88px] items-center  ${getColumnAlignmentClass(index)}`}>  
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </Link>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableBody;
