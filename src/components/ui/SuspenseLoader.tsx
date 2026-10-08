import React from "react";

export interface SuspenseLoaderProps {
  message?: string;
  className?: string;
}

export const SuspenseLoader: React.FC<SuspenseLoaderProps> = ({
  message = "loading module...",
  className = "",
}) => {
  return (
    <div
      className={`min-h-[55vh] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Brand Placeholder Logo with Ambient Emerald Glow */}
      <div className="relative flex items-center justify-center mb-5">
        {/* Ambient emerald pulsing blur */}
        <div className="absolute inset-0 rounded-2xl bg-green-500/25 blur-xl animate-pulse" />

        {/* Logo Card container matching the cyber theme */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-950/90 border border-green-500/40 p-2.5 shadow-[0_0_30px_rgba(34,197,94,0.25)] flex items-center justify-center backdrop-blur-md">
          <img
            src="/favicon.svg"
            alt="Pola Mounir Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Terminal prompt loading message */}
      <div className="font-mono text-xs sm:text-sm tracking-wider text-gray-400 mb-3">
        <span className="text-gray-500">dev@pola:~$ </span>
        <span className="text-green-400 font-semibold">{message}</span>
      </div>

      {/* High-tech pulsing progress track */}
      <div className="w-40 h-1.5 bg-gray-900 rounded-full overflow-hidden relative border border-green-500/30 shadow-inner">
        <div className="absolute inset-y-0 bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-400 rounded-full animate-shimmer w-full" />
      </div>
    </div>
  );
};

export default SuspenseLoader;
