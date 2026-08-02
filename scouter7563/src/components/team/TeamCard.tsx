"use client";

/**
 * TeamCard (team-list variant)
 *
 * Clickable row for one team on `/teams` — navigates to
 * `/teams/[team_key]`, with a favorite star and EPA/"Scouted" badges
 * that only render when that data is present.
 *
 * NOTE: different component from `src/components/cards/TeamCard.tsx`
 * (the selectable alliance-panel card used on `/scout`). Same name,
 * different folder/purpose.
 */
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import {TeamListItem} from "@/types/team"

interface TeamCardProps {
    team: TeamListItem;
    onToggleFavorite?: (teamKey: string) => void;
}
export default function TeamCard({
  team,
  onToggleFavorite,
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
        hover:border-slate-700
      "
    >
      {/* Left */}

      <div className="flex min-w-0 items-center gap-5">

        {/* Avatar */}

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800">

          {team.avatar ? (
            <Image
              src={team.avatar}
              alt={team.nickname ?? "team logo"}
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

        {/* Favorite */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(
              team.team_key
                ? team.team_key
                : " ? ");
          }}
          className={[
            "flex",
            "h-10",
            "w-10",
            "shrink-0",
            "items-center",
            "justify-center",
            "rounded-xl",
            "border",
            "transition-all",
            "duration-200",

            team.favorite
              ? "border-amber-400 bg-amber-500/10 text-amber-400"
              : "border-slate-700 text-slate-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400",
          ].join(" ")}
        >

          <Star
            size={18}
            fill={
              team.favorite
                ? "currentColor"
                : "none"
            }
          />

        </button>

        {team.epa !== undefined && (
          <div className="text-right">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              EPA
            </p>

            <p className="text-xl font-bold text-sky-400">
              {
                team.epa 
                  ? team.epa.toFixed(1)
                  : "--"
              }
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
              Scouted
            </span>

          </div>
        )}

      </div>

    </Link>
  );
}