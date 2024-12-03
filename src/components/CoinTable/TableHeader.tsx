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
                className={`
                            cursor-pointer bg-[#f8f9fa] border-b-2 border-white
                            ${isFirst ? 'first:rounded-l-[10px] first:pl-5' : ''} 
                            ${isLast ? 'last:rounded-r-[10px] last:pr-5' : ''}
                            ${isNav ? 'pt-0 pb-0 first:pl-0 last:pr-0 bg-transparent text-[#a4a4a4] text-[12px] border-b border-gray-300' : 'pt-4 pb-4'}
                          `}
              >
                <div className={`
                                  flex items-center text-gray-color text-sm leading-[22px] font-normal ${getColumnAlignmentClass(index)}
                                  ${isNav ? 'gap-0.5 text-[#a4a4a4] text-[12px]' : 'gap-2'}
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