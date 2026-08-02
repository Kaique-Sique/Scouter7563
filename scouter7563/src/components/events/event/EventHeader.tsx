/**
 * 
 */

import { Calendar, MapPin, Star, Swords, Trophy, Users } from "lucide-react";

export default function EventHeader() {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

            <div className="p-8">
                <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Wolverine Robotics Competition 2026
                </h1>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live
                </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="h-4 w-4" />
                        São Paulo, Brazil
                    </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-400">

                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Mar 18–21
                    </span>

                    <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        48 Teams
                    </span>

                    <span className="flex items-center gap-2">
                        <Swords className="h-4 w-4" />
                        90 Matches
                    </span>

                </div>

            </div>

            <div className="border-t border-slate-800 px-8">

                <nav className="flex gap-8 overflow-x-auto">

                    <button className="border-b-2 border-blue-500 py-4 text-sm font-medium text-white">
                        Overview
                    </button>

                    <button className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-400 transition hover:text-white">
                        Matches
                    </button>

                    <button className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-400 transition hover:text-white">
                        Teams
                    </button>

                    <button className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-400 transition hover:text-white">
                        Rankings
                    </button>

                    <button className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-400 transition hover:text-white">
                        Awards
                    </button>

                    <button className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-400 transition hover:text-white">
                        Scout
                    </button>

                </nav>

            </div>

        </section>
    );
}


