import React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "../ui/Skeleton";

export const ProjectDetailSkeleton: React.FC = () => {
  return (
    <article className="max-w-5xl mx-auto space-y-8 font-mono animate-fadeIn" aria-busy="true" aria-label="Loading project details">
      {/* Back button */}
      <div>
        <Skeleton className="h-9 w-44 rounded-lg" />
      </div>

      {/* Project Header */}
      <div className="bg-gray-900 rounded-xl border border-green-400/30 p-8 space-y-6 shadow-xl shadow-green-400/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-8 md:h-10 w-72 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonBadge className="w-24 h-7" />
            <SkeletonBadge className="w-20 h-7" />
          </div>
        </div>

        {/* Hero image placeholder */}
        <Skeleton className="w-full h-64 md:h-96 rounded-lg" />

        {/* Tech Stack Pills */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((t) => (
              <SkeletonBadge key={t} className="w-20 h-7" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
          <Skeleton className="h-11 w-36 rounded-lg" />
          <Skeleton className="h-11 w-36 rounded-lg" />
        </div>
      </div>

      {/* Deep-dive Specifications Skeleton */}
      <div className="bg-gray-900 rounded-xl border border-green-400/20 p-8 space-y-4">
        <Skeleton className="h-7 w-56 rounded" />
        <SkeletonText lines={4} lineHeight="h-5" />
        <SkeletonText lines={3} lineHeight="h-5" />
      </div>
    </article>
  );
};

export default ProjectDetailSkeleton;
