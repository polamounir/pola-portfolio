import React, { useRef, useEffect } from "react";

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 192}px, ${e.clientY - 192}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-25 will-change-transform"
      style={{
        backgroundColor: "var(--app-glow, #22c55e)",
        top: 0,
        left: 0,
        transform: "translate3d(-192px, -192px, 0)",
      }}
    />
  );
};
