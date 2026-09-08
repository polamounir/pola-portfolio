import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "warning" | "info" | "error";

export interface StatusToastProps {
  isOpen: boolean;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export const StatusToast: React.FC<StatusToastProps> = ({
  isOpen,
  type = "info",
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const typeConfig = {
    success: {
      border: "border-green-400/40",
      bg: "bg-green-500/10",
      text: "text-green-400",
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    },
    warning: {
      border: "border-yellow-400/40",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    },
    error: {
      border: "border-red-400/40",
      bg: "bg-red-500/10",
      text: "text-red-400",
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    },
    info: {
      border: "border-cyan-400/40",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      icon: <Info className="w-5 h-5 text-cyan-400" />,
    },
  };

  const current = typeConfig[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-50 max-w-sm w-full"
        >
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border ${current.border} bg-gray-950/95 shadow-2xl backdrop-blur-md`}
          >
            <div className={`p-2 rounded-lg ${current.bg} shrink-0`}>
              {current.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-bold font-mono ${current.text}`}>
                {title}
              </h4>
              {message && (
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {message}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close notification"
              className="p-1 text-gray-400 hover:text-white rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
