"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface PerformanceChartProps {
  data: {
    match: string;
    score: number;
  }[];
}


export default function PerformanceChart({
  data,
}: PerformanceChartProps) {


  return (

    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Match Performance
      </h2>


      <div className="h-72 w-full">

        <ResponsiveContainer>

          <LineChart data={data}>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="match"
            />


            <YAxis />


            <Tooltip />


            <Line
              type="monotone"
              dataKey="score"
              strokeWidth={3}
            />


          </LineChart>


        </ResponsiveContainer>

      </div>


    </section>

  );
}