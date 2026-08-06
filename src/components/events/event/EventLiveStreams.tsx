import { WebcastUrl } from "@/types/events";


export interface EventLiveStreamsProps {
    webcasts: WebcastUrl[];
}

export default function EventLiveStreams({
    webcasts,
}: EventLiveStreamsProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-5">

            <h2 className="mb-5 text-2xl font-semibold">
                Live Streams
            </h2>

            <div className="space-y-4">

                {webcasts.map((stream) => (

                    <a
                        key={stream.url}
                        href={stream.url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="
        group
        flex items-center justify-between
        rounded-xl border border-slate-800
        bg-slate-800
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-500
        hover:bg-slate-800/80
    "
                    >
                        <div>

                            <h3 className="font-semibold">
                                {stream.type ?? "Untitled Stream"}
                            </h3>

                            {stream.channel && (
                                <p className="text-sm text-slate-400">
                                    {stream.channel}
                                </p>
                            )}

                        </div>

                        <span
                            className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            group-hover:scale-105
            group-hover:bg-blue-500
            group-active:scale-95
        "
                        >
                            Watch
                        </span>

                    </a>

                ))}

            </div>

        </div>
    );
}