"use client";

import CollapsibleCard from "../common/CollapsibleCard";


interface ScoutStatsProps {
  stats: {
    matchesScouted: number;
    averageScore: number;

    auto: {
      l1: number;
      l2: number;
      l3: number;
      l4: number;

      coralPrecision: number;

      algaeRemoved: number;
      algaeNet: number;
      algaeProcessor: number;
    };


    teleop: {

      l1: number;
      l2: number;
      l3: number;
      l4: number;

      coralPrecision: number;

      algaeRemoved: number;
      algaeNet: number;
      algaeProcessor: number;


      collection: {
        coralFloor: number;
        coralStation: number;
        algaeReef: number;
      };


      defenseRate: number;

      driverRating: number;
    };


    endgame: {
      climbSuccessRate: number;
    };
  };
}


function StatRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {

  return (
    <div className="flex justify-between border-b border-slate-800 py-2 last:border-none">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>
  );
}



function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </h3>
  );
}



export default function ScoutStats({
  stats,
}: ScoutStatsProps) {

  return (

    <CollapsibleCard
          title="Scouting Statistics"
          defaultOpen={false}
        >

      <div className="mt-5">

        <StatRow
          label="Matches Scouted"
          value={stats.matchesScouted}
        />


        <StatRow
          label="Average Score"
          value={stats.averageScore}
        />


      </div>



      {/* AUTO */}

      <SectionTitle>
        Auto
      </SectionTitle>


      <StatRow label="L1" value={stats.auto.l1}/>
      <StatRow label="L2" value={stats.auto.l2}/>
      <StatRow label="L3" value={stats.auto.l3}/>
      <StatRow label="L4" value={stats.auto.l4}/>


      <StatRow
        label="Coral Precision"
        value={`${stats.auto.coralPrecision}%`}
      />


      <StatRow
        label="Algae Removed"
        value={stats.auto.algaeRemoved}
      />


      <StatRow
        label="Algae Net"
        value={stats.auto.algaeNet}
      />


      <StatRow
        label="Algae Processor"
        value={stats.auto.algaeProcessor}
      />



      {/* TELEOP */}

      <SectionTitle>
        Teleop
      </SectionTitle>


      <StatRow label="L1" value={stats.teleop.l1}/>
      <StatRow label="L2" value={stats.teleop.l2}/>
      <StatRow label="L3" value={stats.teleop.l3}/>
      <StatRow label="L4" value={stats.teleop.l4}/>


      <StatRow
        label="Coral Precision"
        value={`${stats.teleop.coralPrecision}%`}
      />


      <StatRow
        label="Algae Net"
        value={stats.teleop.algaeNet}
      />


      <StatRow
        label="Processor"
        value={stats.teleop.algaeProcessor}
      />



      {/* COLLECTION */}

      <SectionTitle>
        Collection
      </SectionTitle>


      <StatRow
        label="Coral Floor"
        value={stats.teleop.collection.coralFloor}
      />


      <StatRow
        label="Coral Station"
        value={stats.teleop.collection.coralStation}
      />


      <StatRow
        label="Algae Reef"
        value={stats.teleop.collection.algaeReef}
      />



      {/* ENDGAME */}

      <SectionTitle>
        Endgame
      </SectionTitle>


      <StatRow
        label="Climb Success"
        value={`${stats.endgame.climbSuccessRate}%`}
      />



      {/* DRIVER */}

      <SectionTitle>
        Driver
      </SectionTitle>


      <StatRow
        label="Driver Rating"
        value={stats.teleop.driverRating}
      />


      <StatRow
        label="Defense Rate"
        value={`${stats.teleop.defenseRate}%`}
      />


    </CollapsibleCard>

  );
}