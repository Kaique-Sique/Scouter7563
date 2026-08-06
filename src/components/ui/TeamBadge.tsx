"use client";

import Link from "next/link";
import { Star } from "lucide-react";

interface TeamBadgeProps {
  team: number;
  alliance: "red" | "blue";
  favorite?: boolean;
}

export default function TeamBadge({
  team,
  alliance,
  favorite = false,
}: TeamBadgeProps) {
  const colors =
    alliance === "red"
      ? "bg-red-500/15 text-red-300 hover:bg-red-500/25"
      : "bg-blue-500/15 text-blue-300 hover:bg-blue-500/25";

  return (
    <Link
      href={`/teams/frc${team}`}
      className={`
        inline-flex items-center gap-1.5
        rounded-md px-2.5 py-1.5
        text-sm font-medium
        transition-colors
        ${colors}
      `}
    >
      {favorite && (
        <Star
          size={12}
          className="fill-yellow-400 text-yellow-400"
        />
      )}

      {team}
    </Link>
  );
}