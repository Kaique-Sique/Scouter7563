"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Globe,
    Trophy,
    Star,
    MapPin,
    Calendar,
    ExternalLink,
    Camera,
    Play,
} from "lucide-react";

interface TeamHeaderProps {
    team: {
        team_number: number | string;
        nickname: string;
        organization?: string;
        city?: string;
        country?: string;
        rookie_year?: number;
        website?: string;
        instagram?: string;
        youtube?: string;
        banner?: string;
        avatar?: string;
    };
}

export default function TeamHeader({
    team,
}: TeamHeaderProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

            {/* Banner */}
            <div className="relative h-64 w-full">
                {team.banner ? (
                    <Image
                        src={team.banner}
                        alt={team.nickname}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
                )}

                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative px-8 pb-8">

                {/* Avatar */}
                <div className="-mt-16 flex flex-col gap-6 md:flex-row">

                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-slate-900 bg-slate-800">

                        {team.avatar ? (
                            <Image
                                src={team.avatar}
                                alt={team.nickname}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-4xl font-bold">
                                {team.team_number}
                            </div>
                        )}

                    </div>

                    {/* Information */}
                    <div className="flex flex-1 flex-col justify-end">

                        <div className="flex flex-wrap items-center justify-between gap-4">

                            <div>

                                <h1 className="text-4xl font-bold">
                                    {team.team_number}
                                </h1>

                                <h2 className="text-2xl text-slate-300">
                                    {team.nickname}
                                </h2>

                                {team.organization && (
                                    <p className="mt-1 text-slate-400">
                                        {team.organization}
                                    </p>
                                )}

                            </div>

                            <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 transition hover:bg-slate-800">
                                <Star size={18} />
                                Favorite
                            </button>

                        </div>

                        {/* Quick info */}
                        <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">

                            {(team.city || team.country) && (
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {team.city}
                                    {team.city && team.country ? ", " : ""}
                                    {team.country}
                                </span>
                            )}

                            {team.rookie_year && (
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Rookie {team.rookie_year}
                                </span>
                            )}

                        </div>

                        {/* Links */}
                        <div className="mt-6 flex flex-wrap gap-3">

                            {team.website && (
                                <Link
                                    href={team.website}
                                    target="_blank"
                                    className="rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
                                >
                                    <Globe size={20} />
                                </Link>
                            )}

                            {team.instagram && (
                                <Link
                                    href={team.instagram}
                                    target="_blank"
                                    className="rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
                                >
                                    <Camera size={20} />
                                </Link>
                            )}

                            {team.youtube && (
                                <Link
                                    href={team.youtube}
                                    target="_blank"
                                    className="rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
                                >
                                    <Play size={20} />
                                </Link>
                            )}

                            <Link
                                href={`https://www.thebluealliance.com/team/${team.team_number}`}
                                target="_blank"
                                className="rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
                            >
                                <Trophy size={20} />
                            </Link>

                            <Link
                                href={`https://frc-events.firstinspires.org/team/${team.team_number}`}
                                target="_blank"
                                className="rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
                            >
                                <ExternalLink size={20} />
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}