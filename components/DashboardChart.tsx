"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { dashboardChartData } from "@/lib/chartData";

export default function DashboardChart() {
  return (
    <div className="bg-white rounded-xl border p-4 h-[350px]">
      <h3 className="font-semibold text-gray-800 mb-4">
        Mwelekeo wa Mfumo (Overview)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dashboardChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="vijana"
            stroke="#2563eb"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="fursa"
            stroke="#16a34a"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="mafunzo"
            stroke="#7c3aed"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="maswali"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
