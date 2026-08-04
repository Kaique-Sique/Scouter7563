import { resolveFilterType } from "@/utils/groupEventsByWeek";

export interface EventInfoProps {
    location: string | null;
    venue: string | null;
    date: string | null;
    country: string | null;
    week: string | null;
}

export default function EventInfo({
    location,
    venue,
    date,
    country,
    week,
}: EventInfoProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-5">
            <h3 className="mb-5 text-lg font-semibold">
                Information
            </h3>

            <div className="divide-y divide-slate-700/40">
                <InfoRow label="🌎 Country" value={country ?? "No country available."} />
                <InfoRow label="📍 Location" value={location ?? "No location available."} />
                <InfoRow label="📅 Date" value={date ?? "No date available."} />
                <InfoRow label="🏆 Week" value={resolveFilterType(week ?? "0") ?? "No week available."} />

            </div>
        </div>
    );
}

interface RowProps {
    label: string;
    value: string;
}

function InfoRow({ label, value }: RowProps) {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-muted-foreground">
                {label}
            </span>

            <span className="font-medium">
                {value}
            </span>
        </div>
    );
}