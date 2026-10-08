import React from "react";
import { Skeleton, SkeletonText } from "../ui/Skeleton";

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 font-mono animate-fadeIn" aria-busy="true" aria-label="Loading portfolio home data">
      {/* Terminal Hero Skeleton */}
      <div className="bg-gray-900 rounded-lg border border-green-400/20 shadow-2xl shadow-green-400/5 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-green-400/20">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          <span className="ml-4 text-xs text-gray-400 flex items-center gap-2">
            <span>bash — loading personal runtime</span>
            <span className="inline-block w-1.5 h-3 bg-green-400/60 animate-pulse"></span>
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-2 text-green-400/70 text-sm">
            <span className="animate-pulse">▋</span>
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="space-y-4">
            {/* Title / Role */}
            <Skeleton className="h-9 md:h-11 w-3/4 max-w-xl rounded-md" />
            
            {/* Headline / Summary */}
            <SkeletonText lines={3} lineHeight="h-5" className="max-w-3xl" />

            {/* Experience / Status Subtitle */}
            <Skeleton className="h-4 w-80 max-w-full" />

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3 sm:gap-4">
              <Skeleton className="h-10 w-36 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-44 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-lg border border-green-400/20 p-6 space-y-2"
          >
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        ))}
      </div>

      {/* About Section Teaser Skeleton */}
      <div className="bg-gray-900 rounded-lg border border-green-400/20 p-8 shadow-xl shadow-green-400/5 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-44 rounded" />
        </div>
        <SkeletonText lines={3} lineHeight="h-4" />
      </div>
    </div>
  );
};

export default HomeSkeleton;
