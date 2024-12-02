import {
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
} from "@/components/ui/pagination";

interface PaginationProps {
  pageCount: number;
  pageIndex: number;
  onPageChange: (newPageIndex: number) => void;
}

const CoinPagination = ({ pageCount, pageIndex, onPageChange }: PaginationProps) => {
  const handlePageChange = (direction: 'prev' | 'next') => {
    let newPageIndex = pageIndex;
    if (direction === 'prev') {
      newPageIndex = Math.max(0, pageIndex - 1);
    } else if (direction === 'next') {
      newPageIndex = Math.min(pageCount - 1, pageIndex + 1);
    }
    onPageChange(newPageIndex);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex > 0) handlePageChange('prev');
            }}
          />
        </PaginationItem>

        {/* 페이지 번호 표시 */}
        {Array.from({ length: pageCount }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index);
              }}
              isActive={index === pageIndex}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex < pageCount - 1) handlePageChange('next');
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

export default CoinPagination;
