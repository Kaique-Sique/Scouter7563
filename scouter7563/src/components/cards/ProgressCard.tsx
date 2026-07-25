"use client";

import ProgressBar from "@/components/ui/ProgressBar";

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  current: number;
  total: number;
}

export default function ProgressCard({
  title,
  subtitle,
  current,
  total,
}: ProgressCardProps) {
  const progress =
    total === 0 ? 0 : (current / total) * 100;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <span className="text-sm font-medium text-slate-400">
          {current}/{total} ({Math.round(progress)}%)
        </span>

      </div>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      )}

      <div className="mt-5">
        <ProgressBar value={progress} />
      </div>

    </section>
  );
}