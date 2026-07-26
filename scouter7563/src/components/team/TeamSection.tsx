import TeamCard from "@/components/team/TeamCard";
import { TeamListItem } from "@/types/team";

interface TeamSectionProps {
    id: string;
    title: string;
    teams: TeamListItem[] | null;
    sectionRef?: (el: HTMLElement | null) => void;
    onToggleFavorite?: (teamKey: string) => void;
}

export default function TeamSection({
    id,
    title,
    teams,
    sectionRef,
    onToggleFavorite,
}: TeamSectionProps) {

    return (
        <section
            ref={sectionRef}
            id={id}
            className="scroll-mt-60 space-y-4"
        >

            {/* Section Header */}
            <div className="flex items-center gap-4">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-white
                        whitespace-nowrap
                    "
                >
                    {title}
                </h2>


                <div
                    className="
                        h-px
                        flex-1
                        bg-slate-800
                    "
                />

            </div>


            {/* Teams */}
            <div
                className="
                    space-y-3
                "
            >

                {teams ? teams.map((team) => (

                    <TeamCard
                        key={team.team_key}
                        team={team}
                        onToggleFavorite={onToggleFavorite}
                    />

                )) : null
                }

            </div>

        </section>
    );
}
