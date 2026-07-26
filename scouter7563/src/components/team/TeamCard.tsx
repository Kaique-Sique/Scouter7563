"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";

interface TeamCardProps {
  team: {
    team_key: string;
    team_number: number;
    nickname: string;
    organization?: string;
    city?: string;
    country?: string;

    epa?: number;

    registered?: boolean;
    favorite?: boolean;

    avatar?: string;
  };
}

export default function TeamCard({
  team,
}: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.team_key}`}
      className="
        group
        flex
        items-center
        justify-between
        gap-6
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-sky-500/40
        hover:bg-slate-800/70
      "
    >
      {/* Left */}

      <div className="flex min-w-0 items-center gap-5">

        {/* Avatar */}

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800">

          {team.avatar ? (
            <Image
              src={team.avatar}
              alt={team.nickname}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-slate-300">
              {team.team_number}
            </span>
          )}

        </div>

        {/* Team */}

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <h2 className="text-xl font-bold text-white">
              {team.team_number}
            </h2>

            <span className="text-xl text-slate-300 truncate">
              {team.nickname}
            </span>

          </div>

          {team.organization && (
            <p className="mt-1 truncate text-sm text-slate-400">
              {team.organization}
            </p>
          )}

          {(team.city || team.country) && (
            <p className="mt-1 text-sm text-slate-500">
              {team.city}
              {team.city && team.country && ", "}
              {team.country}
            </p>
          )}

        </div>

      </div>

      {/* Right */}

      <div className="flex shrink-0 flex-col items-end gap-3">

        {team.favorite && (
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        )}

        {team.epa !== undefined && (
          <div className="text-right">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              EPA
            </p>

            <p className="text-xl font-bold text-sky-400">
              {team.epa.toFixed(1)}
            </p>

          </div>
        )}

        {team.registered && (
          <div className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1">

            <ShieldCheck
              size={15}
              className="text-sky-400"
            />

            <span className="text-xs font-medium text-sky-300">
              Registered
            </span>

          </div>
        )}

      </div>

    </Link>
  );
}