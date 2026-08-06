"use client";


import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
} from "recharts";


interface Props {

data:{
 name:string;
 value:number;
}[];

}



export default function EndgameChart({
 data,
}:Props){


return (

<section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-6 text-xl font-bold text-white">
Endgame
</h2>


<div className="h-64">


<ResponsiveContainer>

<BarChart data={data}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar dataKey="value"/>


</BarChart>


</ResponsiveContainer>


</div>


</section>

);


}