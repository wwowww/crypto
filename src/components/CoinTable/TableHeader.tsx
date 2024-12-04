import TriangleSVG from '@/components/TriangleSVG/TriangleSVG';
import { flexRender } from '@tanstack/react-table';

interface TableHeaderProps {
  headerGroups: any[];
  isNav?: boolean;
}

const TableHeader = ({ headerGroups, isNav=false }: TableHeaderProps) => {
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
                className={`cursor-pointer
                            ${isFirst && !isNav ? 'first:rounded-l-[10px] first:pl-5' : ''} 
                            ${isLast && !isNav ? 'last:rounded-r-[10px] last:pr-5' : ''}
                            ${isNav ? 'pt-2 pb-1.5 first:pl-2 last:pr-2 text-[#a4a4a4] text-[12px] tracking-tighter border-b border-[#eee]' : 'pt-4 pb-4 bg-[#f8f9fa] border-b-2 border-white'}
                          `}
              >
                <div className={`flex items-center ${getColumnAlignmentClass(index)}
                                  ${isNav ? 'gap-0.5 text-[#a4a4a4] text-[12px]' : 'gap-2 text-gray-color text-sm leading-[22px] font-normal'}
                              `}>
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