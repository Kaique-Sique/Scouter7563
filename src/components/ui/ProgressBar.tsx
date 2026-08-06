"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  height?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  height = "h-3",
  animated = true,
}: ProgressBarProps) {

  const [progress, setProgress] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) return;

    const frame = requestAnimationFrame(() => {
      setProgress(value);
    });

    return () => cancelAnimationFrame(frame);
  }, [value, animated]);

  const displayValue = animated ? progress : value;

  const color =
    displayValue >= 100
      ? "#22c55e"
      : displayValue >= 75
      ? "#3b82f6"
      : displayValue >= 50
      ? "#eab308"
      : displayValue >= 25
      ? "#f97316"
      : "#ef4444";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-800 ${height}`}
    >
      <div
        className={`relative overflow-hidden rounded-full ${height} transition-all duration-700 ease-out`}
        style={{
          width: `${displayValue}%`,
          backgroundColor: color,
        }}
      >
        {/* Animated stripes */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent 0 10px, rgba(255,255,255,.8) 10px 20px)",
            backgroundSize: "40px 40px",
            animation: "progress-stripes 1.2s linear infinite",
          }}
        />

        {/* Shine when complete */}
        {displayValue === 100 && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 20%, rgba(255,255,255,.7) 50%, transparent 80%)",
              animation: "progress-shine 1.2s ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
}