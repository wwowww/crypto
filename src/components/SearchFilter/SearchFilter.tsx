import SearchIcon from '@image/icon-search.svg';

interface SearchFilterProps {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  isNav?: boolean;
}

const SearchFilter = ({ globalFilter, setGlobalFilter, isNav=false }: SearchFilterProps) => {
  return (
    <div className={`relative ${isNav ? 'w-full mb-[-16px]' : ''}`}>
      <input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className={`pt-[7px] pr-[15px] pb-[6px] pl-[32px] border border-block ${!isNav ? 'font-lg shadow' : 'mb-0 w-full text-sm border-b-transparent'}`}
        placeholder="가상자산명 또는 심볼 검색"
      />
      <SearchIcon className="absolute top-2.5 left-2" />
    </div>
  );
};

export default SearchFilter;
