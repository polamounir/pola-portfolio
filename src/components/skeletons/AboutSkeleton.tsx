import React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "../ui/Skeleton";

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 font-mono animate-fadeIn" aria-busy="true" aria-label="Loading about profile">
      {/* Identity Banner Skeleton */}
      <section className="bg-gray-900/80 border border-green-400/30 rounded-xl p-8 md:p-12 space-y-6 shadow-xl shadow-green-400/5">
        <div className="flex items-center gap-2">
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>

        <Skeleton className="h-9 md:h-12 w-2/3 max-w-lg rounded-md" />

        <div className="space-y-4 border-l-4 border-green-400/30 pl-4 md:pl-6">
          <SkeletonText lines={3} lineHeight="h-5" />
          <SkeletonText lines={2} lineHeight="h-5" />
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </section>

      {/* Skills Group Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-7 h-7 rounded-md" />
          <Skeleton className="h-7 w-48 rounded" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((cat) => (
            <div
              key={cat}
              className="bg-gray-900 rounded-lg border border-green-400/20 p-6 space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="space-y-1.5">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-10 rounded" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-7 h-7 rounded-md" />
          <Skeleton className="h-7 w-44 rounded" />
        </div>

        <div className="space-y-4">
          {[1, 2].map((exp) => (
            <div
              key={exp}
              className="bg-gray-900 rounded-lg border border-green-400/20 p-6 space-y-4"
            >
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div className="space-y-1">
                  <Skeleton className="h-6 w-48 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
                <SkeletonBadge className="w-24 h-6" />
              </div>
              <SkeletonText lines={3} lineHeight="h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-7 h-7 rounded-md" />
          <Skeleton className="h-7 w-52 rounded" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((f) => (
            <div
              key={f}
              className="bg-gray-900/80 border border-green-400/20 rounded-lg p-5 flex justify-between items-center"
            >
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;
