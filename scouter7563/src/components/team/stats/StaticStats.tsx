"use client";

import CollapsibleCard from "../common/CollapsibleCard";

interface StaticStatsProps {
  stats: {
    epa: {
      total: number;
      auto: number;
      teleop: number;
    };

    opr?: number;
    dpr?: number;
    ccwm?: number;

    rank?: number;

    record: {
      wins: number;
      losses: number;
      ties?: number;
      winRate: number;
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
    <div className="flex items-center justify-between border-b border-slate-800 py-3 last:border-none">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

export default function StaticStats({
  stats,
}: StaticStatsProps) {
  return (
    <CollapsibleCard
      title="Static Statistics"
      defaultOpen={false}
    >

      {/* EPA */}

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        EPA
      </h3>

      <StatRow
        label="Overall EPA"
        value={stats.epa.total.toFixed(2)}
      />

      <StatRow
        label="Auto EPA"
        value={stats.epa.auto.toFixed(2)}
      />

      <StatRow
        label="Teleop EPA"
        value={stats.epa.teleop.toFixed(2)}
      />



      {/* Performance */}

      <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Performance
      </h3>

      {stats.opr !== undefined && (
        <StatRow
          label="OPR"
          value={stats.opr.toFixed(2)}
        />
      )}

      {stats.dpr !== undefined && (
        <StatRow
          label="DPR"
          value={stats.dpr.toFixed(2)}
        />
      )}

      {stats.ccwm !== undefined && (
        <StatRow
          label="CCWM"
          value={stats.ccwm.toFixed(2)}
        />
      )}



      {/* Ranking */}

      <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Ranking
      </h3>

      {stats.rank !== undefined && (
        <StatRow
          label="Rank"
          value={`#${stats.rank}`}
        />
      )}



      {/* Record */}

      <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Record
      </h3>

      <StatRow
        label="Wins"
        value={stats.record.wins}
      />

      <StatRow
        label="Losses"
        value={stats.record.losses}
      />

      {stats.record.ties !== undefined && (
        <StatRow
          label="Ties"
          value={stats.record.ties}
        />
      )}

      <StatRow
        label="Win Rate"
        value={`${stats.record.winRate}%`}
      />

    </CollapsibleCard>
  );
}