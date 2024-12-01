import { flexRender } from '@tanstack/react-table';

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

  return (
    <>
      {rows.map((row) => (
        <tr key={row.id} className='gap-0.5'>
          {row.getVisibleCells().map((cell: any, index: number) => (
            <td key={cell.id}>
              <div className={`flex h-[88px] items-center ${getColumnAlignmentClass(index)}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableBody;
