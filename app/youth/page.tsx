"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  MessageCircle,
  Info,
} from "lucide-react";

/* ================= TYPES ================= */

interface DashboardStats {
  opportunities: number;
  trainings: number;
  questions: number;
}
interface User {
  name: string;
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
}

/* ================= COMPONENT ================= */
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}
function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function YouthDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, userRes] = await Promise.all([
          fetch("/api/youth/dashboard/stats"),
          fetch("/api/youth/me"),
        ]);

        const statsData = await statsRes.json();
        const userData = await userRes.json();

        setStats(statsData);
        setUser(userData);
      } catch {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-400">
          {getGreeting()} {user?.name ?? ""} 👋 
        </h1>
        <p className="text-gray-500 text-sm">
          Hapa utaona fursa na mafunzo yaliyoandaliwa kwa ajili yako
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Fursa Zilizopo"
          value={loading ? "..." : String(stats?.opportunities ?? 0)}
          icon={<Briefcase size={22} />}
          color="blue"
        />
        <DashboardCard
          title="Mafunzo Yanayopatikana"
          value={loading ? "..." : String(stats?.trainings ?? 0)}
          icon={<GraduationCap size={22} />}
          color="green"
        />
        <DashboardCard
          title="Maswali Yako"
          value={loading ? "..." : String(stats?.questions ?? 0)}
          icon={<MessageCircle size={22} />}
          color="purple"
        />
      </div>

      {/* INFO */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="text-blue-600 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-blue-800">
              Kumbuka
            </h3>
            <p className="text-sm text-blue-700">
              Fursa na mafunzo haya hayahitaji ku-apply ndani ya mfumo.
              Utapewa maelekezo ya moja kwa moja jinsi ya kufikia
              fursa husika.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
