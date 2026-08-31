import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: string;
  accentcolor?: string;
  trend?: {
    text: string;
    isPositive?: boolean;
    isDanger?: boolean;
  };
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor,
  accentcolor,
  trend,
}: MetricCardProps) {
  const color = accentColor || accentcolor || "indigo";
  
  // Dynamic glow border accent
  const getAccentBorder = () => {
    switch (color) {
      case "yellow":
        return "hover:border-yellow-500/40";
      case "purple":
        return "hover:border-purple-500/40";
      case "red":
        return "hover:border-red-500/40";
      case "emerald":
        return "hover:border-emerald-500/40";
      case "indigo":
      default:
        return "hover:border-indigo-500/40";
    }
  };

  return (
    <div className={`relative rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 ${getAccentBorder()} p-6 transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          {/* Small label in monospace with wide tracking */}
          <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400 mb-2">
            {title}
          </p>
          {/* Numerical stat in monospace with wide tracking */}
          <h3 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-widest">
            {value}
          </h3>
          {subtitle && (
            <p className="font-mono text-xs text-gray-400 tracking-wider mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Minimalist wireframe circular icon badge */}
        <div className="p-3 rounded-full border border-white/15 bg-white/[0.03] text-gray-200">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2.5">
          {/* Perfectly pill-shaped chip */}
          <span
            className={`rounded-full px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase border ${
              trend.isDanger
                ? "border-red-500/30 text-red-300 bg-red-500/5"
                : trend.isPositive
                ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/5"
                : "border-white/15 text-gray-300 bg-white/[0.02]"
            }`}
          >
            {trend.text}
          </span>
          <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
            Run comparison
          </span>
        </div>
      )}
    </div>
  );
}
