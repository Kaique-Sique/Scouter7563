"use client";

import { LucideIcon } from "lucide-react";

interface TeamStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
}

export default function TeamStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: TeamStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>


        {Icon && (
          <div className="rounded-xl bg-slate-800 p-3 text-slate-300">
            <Icon size={22} />
          </div>
        )}

      </div>

    </div>
  );
}