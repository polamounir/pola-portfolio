import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Sparkles,
  Terminal,
  Info,
  CheckCircle,
  Zap,
  X,
} from "lucide-react";
import type { BackendAlert } from "../../services/api";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  Bell,
  Sparkles,
  Terminal,
  Info,
  CheckCircle,
  Zap,
};

interface MaintenanceBannerProps {
  alertConfig?: BackendAlert | null;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  alertConfig,
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Do not render if dismissed, still loading, or if alert is inactive
  if (isDismissed || !alertConfig || !alertConfig.isActive) {
    return null;
  }

  // Fallback defaults
  const message = alertConfig?.message ?? "SYSTEM UPDATE IN PROGRESS";
  const badgeText = alertConfig?.badgeText ?? "BETA";
  const subtext =
    alertConfig?.subtext ??
    "Some portfolio modules are currently being synchronized with live database.";
  const footerText = alertConfig?.footerText ?? "v2.1 • node@online";
  const iconName = alertConfig?.icon ?? "AlertTriangle";
  const SelectedIcon = ICON_MAP[iconName] || AlertTriangle;

  const showClose = alertConfig?.showCloseButton ?? true;
  const pulseGlow = alertConfig?.pulseGlow ?? true;
  const backdropBlur = alertConfig?.backdropBlur ?? true;

  const fontFamily = alertConfig?.fontFamily || "font-mono";
  const titleFontSize = alertConfig?.titleFontSize || "text-xs";
  const bodyFontSize = alertConfig?.bodyFontSize || "text-xs";

  const primaryColor = alertConfig?.primaryColor || "#eab308";
  const backgroundColor = alertConfig?.backgroundColor || "#030712";
  const borderColor = alertConfig?.borderColor || "rgba(234, 179, 8, 0.4)";
  const titleColor = alertConfig?.titleColor || "#facc15";
  const textColor = alertConfig?.textColor || "#9ca3af";
  const badgeBgColor = alertConfig?.badgeBgColor || "rgba(234, 179, 8, 0.2)";
  const badgeTextColor = alertConfig?.badgeTextColor || "#fde047";
  const glowColor = alertConfig?.glowColor || "#facc15";

  // Position classes
  let positionClass = "fixed bottom-6 left-1/2 -translate-x-1/2";
  if (alertConfig?.position === "top-center") {
    positionClass = "fixed top-6 left-1/2 -translate-x-1/2";
  } else if (alertConfig?.position === "bottom-right") {
    positionClass = "fixed bottom-6 right-6";
  } else if (alertConfig?.position === "top-right") {
    positionClass = "fixed top-6 right-6";
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: alertConfig?.position?.startsWith("top") ? -40 : 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: alertConfig?.position?.startsWith("top") ? -30 : 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`${positionClass} z-50 w-[90%] max-w-lg`}
      >
        <div
          className={`relative overflow-hidden rounded-xl border p-4 shadow-2xl transition-all duration-300 ${fontFamily} ${
            backdropBlur ? "backdrop-blur-md" : ""
          }`}
          style={{
            backgroundColor,
            borderColor,
            boxShadow: `0 15px 35px -5px ${glowColor}25`,
          }}
        >
          {/* Animated top glow bar */}
          {pulseGlow && (
            <div
              className="absolute top-0 left-0 right-0 h-[2px] animate-pulse"
              style={{
                background: `linear-gradient(to right, transparent, ${glowColor}, transparent)`,
              }}
            />
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 p-2 rounded-lg shrink-0"
                style={{
                  backgroundColor: `${primaryColor}1a`,
                  borderColor: `${primaryColor}4d`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: primaryColor,
                }}
              >
                <SelectedIcon className="w-5 h-5 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`${titleFontSize} font-bold tracking-wider`}
                    style={{ color: titleColor }}
                  >
                    {message}
                  </span>
                  {badgeText && (
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] border"
                      style={{
                        backgroundColor: badgeBgColor,
                        color: badgeTextColor,
                        borderColor: `${primaryColor}50`,
                      }}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>

                {subtext && (
                  <p
                    className={`mt-1 ${bodyFontSize} leading-relaxed font-sans`}
                    style={{ color: textColor }}
                  >
                    {subtext}
                  </p>
                )}

                {footerText && (
                  <div
                    className="mt-2 flex items-center gap-2 text-[11px] opacity-80"
                    style={{ color: textColor }}
                  >
                    <Terminal className="w-3 h-3 text-green-400" />
                    <span>{footerText}</span>
                  </div>
                )}
              </div>
            </div>

            {showClose && (
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
