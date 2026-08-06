"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ScoreBreakdownChartProps {
  data: {
    match: string;
    auto: number;
    teleop: number;
  }[];
}

export default function ScoreBreakdownChart({
  data,
}: ScoreBreakdownChartProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold text-white">
            Auto vs Teleop Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Score distribution per match
          </p>
        </div>

      </div>

      <div className="h-80 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="match"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: "#1E293B" }}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              wrapperStyle={{
                paddingBottom: 10,
              }}
            />

            <Bar
              dataKey="auto"
              name="Auto"
              stackId="score"
              fill="#153f52ff"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="teleop"
              name="Teleop"
              stackId="score"
              fill="#096894ff"
              radius={[4, 4, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}