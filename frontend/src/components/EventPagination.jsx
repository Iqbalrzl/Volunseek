import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const EventPagination = ({
  currentPage,
  hasNext,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            onClick={onPreviousPage}
            variant="ghost"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>
        </PaginationItem>

        <PaginationItem className="mx-8 font-semibold">
          Page {currentPage}
        </PaginationItem>

        <PaginationItem>
          <Button disabled={!hasNext} onClick={onNextPage} variant="ghost">
            Next <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
