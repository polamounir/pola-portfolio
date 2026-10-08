import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <>
      <div
        className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden"
        style={{ contain: "strict", zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--app-primary, #22c55e) 25%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--app-primary, #22c55e) 25%, transparent) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, 50px, 0); }
        }
      `}</style>
    </>
  );
};
