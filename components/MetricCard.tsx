import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    text: string;
    isPositive?: boolean;
    isDanger?: boolean;
  };
  accentColor?: "indigo" | "red" | "emerald" | "amber";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "indigo",
}: MetricCardProps) {
  const accentStyles = {
    indigo: {
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      glow: "from-indigo-500/5 to-transparent",
    },
    red: {
      iconBg: "bg-red-500/10 text-red-400 border-red-500/20",
      glow: "from-red-500/5 to-transparent",
    },
    emerald: {
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "from-emerald-500/5 to-transparent",
    },
    amber: {
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "from-amber-500/5 to-transparent",
    },
  }[accentColor];

  return (
    <div className="relative group overflow-hidden rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40">
      {/* Subtle ambient gradient */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${accentStyles.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 font-medium">{subtitle}</p>
          )}
        </div>

        <div
          className={`p-3 rounded-xl border ${accentStyles.iconBg} backdrop-blur-sm shadow-inner`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
              trend.isDanger
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : trend.isPositive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-gray-500/10 text-gray-400 border-gray-500/20"
            }`}
          >
            {trend.text}
          </span>
          <span className="text-[11px] text-gray-500">vs previous run</span>
        </div>
      )}
    </div>
  );
}
