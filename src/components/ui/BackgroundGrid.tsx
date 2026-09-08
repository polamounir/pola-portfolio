import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--app-primary, #22c55e) 25%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--app-primary, #22c55e) 25%, transparent) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </>
  );
};
