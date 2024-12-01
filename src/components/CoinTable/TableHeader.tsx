import TriangleSVG from '@/components/TriangleSVG/TriangleSVG';
import { flexRender } from '@tanstack/react-table';

interface TableHeaderProps {
  headerGroups: any[];
}

const TableHeader = ({ headerGroups }: TableHeaderProps) => {
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
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any, index: number) => {
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
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default TableHeader;