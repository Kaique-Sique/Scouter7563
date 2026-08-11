/**
 * AwardsList
 *
 * Awards tab content: shows `SKELETON_AWARDS` worth of `AwardRowSkeleton`
 * while `loading`, or the real `EventAward[]` as `AwardRow`s once this
 * is wired up to real TBA data.
 */
import { EventAward } from "@/types/events";
import AwardRow from "./AwardRow";
import AwardRowSkeleton from "./AwardRowSkeleton";

const SKELETON_AWARDS = 4;

interface AwardsListProps {
    awards: EventAward[];
    loading: boolean;
}

export default function AwardsList({ awards, loading }: AwardsListProps) {
    return (
        <div className="space-y-3">
            {loading
                ? Array.from({ length: SKELETON_AWARDS }).map((_, i) => (
                    <AwardRowSkeleton key={i} />
                ))
                : awards.map((award) => (
                    <AwardRow key={award.id} award={award} />
                ))}
        </div>
    );
}
