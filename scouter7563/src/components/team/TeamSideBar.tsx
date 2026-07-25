"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  MapPin,
  Users,
  Star,
  GitCompare,
  Share2,
  ExternalLink,
} from "lucide-react";

interface TeamSidebarProps {
  team: {
    organization?: string;
    city?: string;
    country?: string;
    rookie_year?: number;
    members?: number;

    website?: string;
    tba?: string;
    first?: string;
    instagram?: string;
    youtube?: string;
  };
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function LinkButton({
  href,
  label,
}: {
  href?: string;
  label: string;
}) {
  if (!href) return null;

  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2 text-sm transition hover:bg-slate-800"
    >
      {label}
      <ExternalLink size={16} />
    </Link>
  );
}

export default function TeamSidebar({
  team,
}: TeamSidebarProps) {
  return (
    <aside className="sticky top-20 h-fit space-y-6">

      {/* Information */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <h2 className="mb-5 text-lg font-semibold">
          Team Information
        </h2>

        <div className="space-y-4">
          <InfoRow
            icon={<Building2 size={18} />}
            label="Organization"
            value={team.organization}
          />

          <InfoRow
            icon={<MapPin size={18} />}
            label="Location"
            value={
              [team.city, team.country]
                .filter(Boolean)
                .join(", ")
            }
          />

          <InfoRow
            icon={<Calendar size={18} />}
            label="Rookie Year"
            value={team.rookie_year}
          />

          <InfoRow
            icon={<Users size={18} />}
            label="Members"
            value={team.members}
          />
        </div>

      </div>

      {/* Links */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <h2 className="mb-5 text-lg font-semibold">
          Links
        </h2>

        <div className="space-y-3">

          <LinkButton
            href={team.website}
            label="Website"
          />

          <LinkButton
            href={team.tba}
            label="The Blue Alliance"
          />

          <LinkButton
            href={team.first}
            label="FIRST Inspires"
          />

          <LinkButton
            href={team.instagram}
            label="Instagram"
          />

          <LinkButton
            href={team.youtube}
            label="YouTube"
          />

        </div>

      </div>

      {/* Actions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <h2 className="mb-5 text-lg font-semibold">
          Actions
        </h2>

        <div className="space-y-3">

          <button className="flex w-full items-center gap-3 rounded-lg border border-slate-800 px-3 py-2 text-sm transition hover:bg-slate-800">
            <Star size={18} />
            Favorite Team
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg border border-slate-800 px-3 py-2 text-sm transition hover:bg-slate-800">
            <GitCompare size={18} />
            Compare Team
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg border border-slate-800 px-3 py-2 text-sm transition hover:bg-slate-800">
            <Share2 size={18} />
            Share Profile
          </button>

        </div>

      </div>

    </aside>
  );
}