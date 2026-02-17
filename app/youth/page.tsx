"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap, MessageCircle, Info } from "lucide-react";
import StatCard from "@/components/youth/StatCard";

/* ================= TYPES ================= */
interface DashboardStats {
  opportunities: number;
  trainings: number;
  questions: number;
}

interface User {
  name: string;
}

/* ================= COMPONENTS ================= */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
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
    <div className="space-y-8 animate-fadeIn p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary)">
          {getGreeting()} {user?.name ?? ""} 👋
        </h1>

        <p className="text-sm sm:text-base opacity-70">
          Hapa utaona fursa na mafunzo yaliyoandaliwa kwa ajili yako
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Fursa Zilizopo"
          value={String(stats?.opportunities ?? 0)}
          icon={<Briefcase size={22} />}
          loading={loading}
        />
        <StatCard
          title="Mafunzo Yanayopatikana"
          value={String(stats?.trainings ?? 0)}
          icon={<GraduationCap size={22} />}
          loading={loading}
        />
        <StatCard
          title="Maswali Yako"
          value={String(stats?.questions ?? 0)}
          icon={<MessageCircle size={22} />}
          loading={loading}
        />
      </div>

      {/* INFO BOX */}
      <div
        className={
          loading
            ? "animate-pulse h-24 rounded-xl card border-default"
            : "card border-default rounded-xl p-6 flex items-start gap-3 shadow-sm"
        }
      >
        {!loading && (
          <>
            <div className="p-2 rounded-md bg-black/5">
              <Info size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-(--text-primary)">
                Kumbuka
              </h3>

              <p className="text-sm opacity-70">
                Fursa na mafunzo haya hayahitaji ku-apply ndani ya mfumo.
                Utapewa maelekezo ya moja kwa moja jinsi ya kufikia fursa husika.
              </p>
            </div>
          </>
        )}
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-6 opacity-70">
          Inapakia dashboard...
        </div>
      )}
    </div>
  );
}
