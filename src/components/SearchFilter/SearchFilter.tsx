import SearchIcon from '@image/icon-search.svg';

interface SearchFilterProps {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter = ({ globalFilter, setGlobalFilter }: SearchFilterProps) => {
  return (
    <div className="relative">
      <input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="pt-[7px] pr-[15px] pb-[6px] pl-[32px] font-lg shadow border border-block"
        placeholder="가상자산명 또는 심볼 검색"
      />
      <SearchIcon className="absolute top-2.5 left-2" />
    </div>
  );
};

export default SearchFilter;
