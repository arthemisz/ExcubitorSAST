import React from "react";
import MetricCard from "@/components/MetricCard";
import RepoTable from "@/components/RepoTable";
import { MOCK_REPOSITORIES, MOCK_HERO_STATS } from "@/data/mockData";
import { 
  FolderGit2, 
  ShieldAlert, 
  Binary, 
  Activity
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 
        BACKGROUND LAYER 
        This recreates the atmospheric styling from your reference image.
      */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Black Base */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Purple Radial Glow (Top Right) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-purple-900/30 blur-[150px] -translate-y-1/4 translate-x-1/4" />
        
        {/* Subtle Yellow Radial Glow (Bottom Left) */}
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-yellow-700/10 blur-[150px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* 
        CONTENT LAYER 
        This is your exact dashboard code, pulled to the front with z-10.
      */}
      <div className="relative z-10 space-y-8 animate-in fade-in duration-300 p-6 md:p-10 text-gray-300">
        
        {/* Top Banner & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                Continuous AST Scanner
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Security Overview
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Real-time static code vulnerability metrics and repository scan health.
            </p>
          </div>

          {/* Action / Status Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Ruleset: OWASP Top 10 + CWE</span>
            </div>
          </div>
        </div>

        {/* Hero Stats: Three Glassmorphic Metric Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <MetricCard
            title="Total Repos"
            value={MOCK_HERO_STATS.totalRepos}
            subtitle="4 active repositories onboarded"
            icon={FolderGit2}
            accentcolor="indigo"
            trend={{ text: "+1 this week", isPositive: true }}
          />
          <MetricCard
            title="Critical Open"
            value={MOCK_HERO_STATS.criticalOpen}
            subtitle="Requires immediate developer remediation"
            icon={ShieldAlert}
            accentcolor="red"
            trend={{ text: "3 unpatched", isDanger: true }}
          />
          <MetricCard
            title="Lines Analyzed"
            value={MOCK_HERO_STATS.linesAnalyzed}
            subtitle="Across JavaScript, TypeScript & Terraform"
            icon={Binary}
            accentcolor="emerald"
            trend={{ text: "99.8% coverage", isPositive: true }}
          />
        </section>

        {/* Repositories Data Table */}
        <section className="space-y-4">
          <RepoTable repositories={MOCK_REPOSITORIES} />
        </section>

      </div>
    </div>
  );
}