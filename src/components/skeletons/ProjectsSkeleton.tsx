import React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "../ui/Skeleton";

export const ProjectsSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="space-y-8 font-mono animate-fadeIn" aria-busy="true" aria-label="Loading projects catalog">
      {/* Header Skeleton */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="h-8 md:h-10 w-64 md:w-96 rounded-md" />
        </div>
        <Skeleton className="h-7 w-28 rounded-md" />
      </header>

      {/* Projects Grid Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-lg border border-green-400/20 p-6 flex flex-col justify-between shadow-lg shadow-green-400/5 space-y-4"
          >
            <div>
              {/* Thumbnail Placeholder */}
              <Skeleton className="w-full h-44 rounded-md mb-4" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <Skeleton className="h-6 w-3/5 rounded" />
                <SkeletonBadge className="w-16" />
              </div>

              {/* Description */}
              <SkeletonText lines={2} lineHeight="h-4" className="mb-4" />

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-1 mb-4">
                <SkeletonBadge className="w-14 h-5" />
                <SkeletonBadge className="w-16 h-5" />
                <SkeletonBadge className="w-20 h-5" />
                <SkeletonBadge className="w-12 h-5" />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <Skeleton className="h-5 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
