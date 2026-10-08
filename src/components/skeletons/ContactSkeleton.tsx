import React from "react";
import { Skeleton } from "../ui/Skeleton";

export const ContactSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 font-mono animate-fadeIn" aria-busy="true" aria-label="Loading contact interface">
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="h-8 md:h-10 w-52 rounded-md" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="bg-gray-900 rounded-lg border border-green-400/20 p-8 space-y-6">
          <Skeleton className="h-6 w-44 rounded" />

          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-5 w-52 rounded" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-5 w-40 rounded" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="flex gap-3">
                <Skeleton className="h-9 w-28 rounded-lg" />
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-gray-900 rounded-lg border border-green-400/20 p-8 space-y-5">
          <Skeleton className="h-6 w-48 rounded" />

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>

            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
