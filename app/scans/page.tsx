"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 7-day scan throughput telemetry data
const SCAN_HISTORY_DATA = [
  { date: "Aug 25", totalScans: 120, criticalFindings: 4, automated: 98 },
  { date: "Aug 26", totalScans: 154, criticalFindings: 7, automated: 130 },
  { date: "Aug 27", totalScans: 143, criticalFindings: 2, automated: 121 },
  { date: "Aug 28", totalScans: 189, criticalFindings: 12, automated: 165 },
  { date: "Aug 29", totalScans: 210, criticalFindings: 5, automated: 190 },
  { date: "Aug 30", totalScans: 195, criticalFindings: 8, automated: 172 },
  { date: "Aug 31", totalScans: 240, criticalFindings: 3, automated: 215 },
];

const DETAILED_SCANS = [
  { id: "SCN-9942", repo: "auth-service-api", branch: "main", status: "Completed", findings: 11, critical: 2 },
  { id: "SCN-9941", repo: "payment-gateway", branch: "master", status: "Completed", findings: 8, critical: 1 },
  { id: "SCN-9940", repo: "frontend-dashboard", branch: "develop", status: "Completed", findings: 5, critical: 0 },
  { id: "SCN-9939", repo: "infra-terraform-modules", branch: "main", status: "Completed", findings: 2, critical: 0 },
  { id: "SCN-9938", repo: "api-gateway-service", branch: "staging", status: "Failed", findings: 0, critical: 0 },
];

export default function SimpleScansPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono p-8 max-w-5xl mx-auto space-y-10">
      
      {/* 1. Header */}
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-sans font-bold text-white">Scan Analytics</h1>
        <p className="text-sm text-gray-500 mt-2">Historical throughput and vulnerability metrics.</p>
      </header>

      {/* 2. Top Level Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 border border-white/10 bg-white/5 rounded-xl">
          <p className="text-xs uppercase text-gray-400 mb-1">Total Scans (7 Days)</p>
          <h2 className="text-3xl font-bold text-white">1,251</h2>
        </div>
        <div className="p-6 border border-white/10 bg-white/5 rounded-xl">
          <p className="text-xs uppercase text-gray-400 mb-1">Critical Findings</p>
          <h2 className="text-3xl font-bold text-red-400">41</h2>
        </div>
      </div>

      {/* 3. The Recharts Graph */}
      <section className="border border-white/10 bg-white/5 rounded-xl p-6">
        <h3 className="font-sans font-bold text-white mb-6">7-Day Throughput vs Critical Vulnerabilities</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SCAN_HISTORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff20", color: "#fff" }}
              />
              <Area type="monotone" dataKey="totalScans" stroke="#eab308" fillOpacity={0.1} fill="#eab308" name="Total Scans" />
              <Area type="monotone" dataKey="criticalFindings" stroke="#ef4444" fillOpacity={0.1} fill="#ef4444" name="Critical Vulns" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. Simple Scan Log Table */}
      <section className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-sans font-bold text-white">Recent Scan Log</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-black/20 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4 font-normal">Scan ID</th>
              <th className="p-4 font-normal">Repository</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Total Findings</th>
              <th className="p-4 font-normal">Critical</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {DETAILED_SCANS.map((scan) => (
              <tr key={scan.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-yellow-400">{scan.id}</td>
                <td className="p-4 text-white">{scan.repo} <span className="text-gray-500 text-xs">({scan.branch})</span></td>
                <td className="p-4">
                  <span className={scan.status === "Completed" ? "text-emerald-400" : "text-red-400"}>
                    {scan.status}
                  </span>
                </td>
                <td className="p-4 text-white">{scan.findings}</td>
                <td className="p-4">
                  {scan.critical > 0 ? (
                    <span className="text-red-400 font-bold">{scan.critical}</span>
                  ) : (
                    <span className="text-gray-500">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}