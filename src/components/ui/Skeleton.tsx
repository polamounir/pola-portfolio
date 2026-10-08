import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", style, ...props }) => {
  return (
    <div
      className={`animate-shimmer rounded bg-gray-900/60 border border-white/5 ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lineHeight?: string;
}> = ({ lines = 3, className = "", lineHeight = "h-4" }) => {
  return (
    <div className={`space-y-2.5 w-full ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`${lineHeight} ${
            idx === lines - 1 && lines > 1 ? "w-4/5" : "w-full"
          }`}
        />
      ))}
    </div>
  );
};

export const SkeletonBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <Skeleton className={`h-6 w-20 rounded-full ${className}`} />;
};

export const SkeletonButton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <Skeleton className={`h-10 w-32 rounded-lg ${className}`} />;
};

export default Skeleton;
