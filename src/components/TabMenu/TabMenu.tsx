interface TabMenuProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TabMenu = ({ activeTab, onTabClick }: TabMenuProps) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`rounded-[8px] border py-[7px] px-[15px] text-[13px] ${activeTab === 'all' ? 'text-[#3d414b] border-[#3d414b]' : 'text-[#707882] border-[#e2e4e7]'}`}
        onClick={() => onTabClick('all')}
      >
        All
      </button>
      <button
        className={`rounded-[8px] border py-[7px] px-[15px] text-[13px] ${activeTab === 'trending' ? 'text-[#3d414b] border-[#3d414b]' : 'text-[#707882] border-[#e2e4e7]'}`}
        onClick={() => onTabClick('trending')}
      >
        Trending
      </button>
    </div>
  );
};

export default TabMenu;
