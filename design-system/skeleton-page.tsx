import React from "react";
import { Skeleton } from "@/design-system/skeleton";
import { DataTableSkeleton } from "@/components/skeleton-table";
import { KPI } from "@/components/kpi";

interface SkeletonPageProps {
  showHeader?: boolean;
  showBreadcrumbs?: boolean;
  showTitle?: boolean;
  showActions?: boolean;
  showContent?: boolean;
  showSidebar?: boolean;
}

function SkeletonPage({
  showHeader = true,
  showBreadcrumbs = true,
  showTitle = true,
  showActions = true,
  showContent = true,
  showSidebar = false,
}: SkeletonPageProps) {
  return (
    <div className="loupe-system">
      {/* Breadcrumbs Header */}
      {showHeader && showBreadcrumbs && (
        <header className="loupe-system flex w-full shrink-0 items-center gap-2 h-14 px-6 justify-between border-b">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {showActions && <Skeleton className="h-8 w-24" />}
          </div>
        </header>
      )}

      {/* Title Header */}
      {showHeader && !showBreadcrumbs && showTitle && (
        <div className="loupe-system flex w-full shrink-0 items-center justify-between h-20 px-6 border-b">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              </div>
            </div>
            {showActions && <Skeleton className="h-8 w-32" />}
          </div>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="loupe-system flex flex-col p-6 gap-6 w-full min-h-[calc(100vh-100px)] mx-auto lg:flex-row">
          <div className="w-full flex flex-1 flex-col gap-6">
            {/* Page Content Skeletons */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <KPI key={i} label="" value="" isLoading={true} />
                ))}
              </div>

              <DataTableSkeleton />
            </div>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="w-full lg:w-57 lg:pl-4 lg:ml-4 lg:border-l">
              <div className="space-y-4">
                <div className="p-4">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <Skeleton className="h-6 w-20 mb-3" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { SkeletonPage };
