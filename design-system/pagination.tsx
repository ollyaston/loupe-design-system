import * as React from "react";
import { Icon } from "./icon";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/design-system/button";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number;
  totalPages?: number;
  showPrevious?: boolean;
  showNext?: boolean;
  showEllipsis?: boolean;
  onPageChange?: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousHref?: string;
  nextHref?: string;
  pageHref?: (page: number) => string;
  compact?: boolean;
  maxVisiblePages?: number;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage = 1,
      totalPages = 1,
      showPrevious = true,
      showNext = true,
      showEllipsis = true,
      onPageChange,
      onPrevious,
      onNext,
      previousHref,
      nextHref,
      pageHref,
      compact = false,
      maxVisiblePages = 5,
      ...props
    },
    ref,
  ) => {
    const handlePageClick = (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      }
    };

    const handlePrevious = () => {
      if (onPrevious) {
        onPrevious();
      } else if (onPageChange && currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (onNext) {
        onNext();
      } else if (onPageChange && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

    const renderPageLink = (page: number, isActive: boolean) => {
      const href = pageHref ? pageHref(page) : undefined;

      if (href) {
        return (
          <a
            href={href}
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
              "loupe-system",
              buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size: compact ? "icon" : "icon",
              }),
            )}
          >
            {page}
          </a>
        );
      }

      return (
        <button
          onClick={() => handlePageClick(page)}
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          className={cn(
            "loupe-system",
            buttonVariants({
              variant: isActive ? "outline" : "ghost",
              size: compact ? "icon" : "icon",
            }),
          )}
        >
          {page}
        </button>
      );
    };

    const renderPrevious = () => {
      if (!showPrevious) return null;

      const href = previousHref;
      const isDisabled = currentPage <= 1;

      if (href) {
        return (
          <a
            href={isDisabled ? undefined : href}
            aria-label="Go to previous page"
            data-slot="pagination-previous"
            className={cn(
              "loupe-system",
              buttonVariants({
                variant: "ghost",
                size: "default",
              }),
              "gap-1 px-2.5",
              isDisabled && "pointer-events-none opacity-50",
            )}
          >
            <Icon name="chevron_left" size={16} />
            <span>Previous</span>
          </a>
        );
      }

      return (
        <button
          onClick={handlePrevious}
          disabled={isDisabled}
          aria-label="Go to previous page"
          data-slot="pagination-previous"
          className={cn(
            "loupe-system",
            buttonVariants({
              variant: "ghost",
              size: "default",
            }),
            "gap-1 px-2.5",
            isDisabled && "pointer-events-none opacity-50",
          )}
        >
          <Icon name="chevron_left" size={16} />
          <span>Previous</span>
        </button>
      );
    };

    const renderNext = () => {
      if (!showNext) return null;

      const href = nextHref;
      const isDisabled = currentPage >= totalPages;

      if (href) {
        return (
          <a
            href={isDisabled ? undefined : href}
            aria-label="Go to next page"
            data-slot="pagination-next"
            className={cn(
              "loupe-system",
              buttonVariants({
                variant: "ghost",
                size: "default",
              }),
              "gap-1 px-2.5",
              isDisabled && "pointer-events-none opacity-50",
            )}
          >
            <span>Next</span>
            <Icon name="chevron_right" size={16} />
          </a>
        );
      }

      return (
        <button
          onClick={handleNext}
          disabled={isDisabled}
          aria-label="Go to next page"
          data-slot="pagination-next"
          className={cn(
            "loupe-system",
            buttonVariants({
              variant: "ghost",
              size: "default",
            }),
            "gap-1 px-2.5",
            isDisabled && "pointer-events-none opacity-50",
          )}
        >
          <span>Next</span>
          <Icon name="chevron_right" size={16} />
        </button>
      );
    };

    const renderEllipsis = () => (
      <span
        aria-hidden
        data-slot="pagination-ellipsis"
        className="loupe-system flex size-9 items-center justify-center"
      >
        <Icon name="more_horiz" size={16} />
        <span className="sr-only">More pages</span>
      </span>
    );

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("loupe-system", "mx-auto flex w-full justify-center")}
        {...props}
      >
        <ul className="loupe-system flex flex-row items-center gap-1">
          <li data-slot="pagination-item">{renderPrevious()}</li>

          {showStartEllipsis && showEllipsis && (
            <li data-slot="pagination-item">{renderPageLink(1, false)}</li>
          )}

          {showStartEllipsis && showEllipsis && (
            <li data-slot="pagination-item">{renderEllipsis()}</li>
          )}

          {visiblePages.map((page) => (
            <li key={page} data-slot="pagination-item">
              {renderPageLink(page, page === currentPage)}
            </li>
          ))}

          {showEndEllipsis && showEllipsis && (
            <li data-slot="pagination-item">{renderEllipsis()}</li>
          )}

          {showEndEllipsis && showEllipsis && (
            <li data-slot="pagination-item">
              {renderPageLink(totalPages, false)}
            </li>
          )}

          <li data-slot="pagination-item">{renderNext()}</li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

export { Pagination };
