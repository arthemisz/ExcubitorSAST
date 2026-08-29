import React from "react";
import Link from "next/link";
import { Repository } from "@/data/mockData";
import { 
  GitBranch, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

interface RepoTableProps {
  repositories: Repository[];
}

export default function RepoTable({ repositories }: RepoTableProps) {
  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Repositories Overview</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
              {repositories.length} total
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitored repositories analyzed by static security AST engines
          </p>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <th className="py-3.5 px-5">Repository Name</th>
              <th className="py-3.5 px-5">Last Scan Time</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5">Severity Findings Breakdown</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {repositories.map((repo) => {
              const isPass = repo.status === "Pass";
              const { critical, high, medium, low } = repo.findingsCount;
              const hasFindings = critical + high + medium + low > 0;

              return (
                <tr
                  key={repo.id}
                  className="group hover:bg-white/[0.04] transition-colors duration-150"
                >
                  {/* Repo Name & Branch */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isPass 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}>
                        {isPass ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <div>
                        <Link 
                          href={`/repo/${repo.id}/finding/${repo.topFindingId}`}
                          className="font-medium text-white group-hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{repo.name}</span>
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400 font-mono">
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3 text-gray-500" />
                            {repo.defaultBranch}
                          </span>
                          <span>•</span>
                          <span>{repo.linesAnalyzed.toLocaleString()} LoC</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Last Scan Time */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{repo.lastScanTime}</span>
                    </div>
                  </td>

                  {/* Status (Pass / Fail) */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        isPass
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/10"
                          : "bg-red-500/10 text-red-400 border-red-500/20 shadow-sm shadow-red-500/10"
                      }`}
                    >
                      {isPass ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASS</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>FAIL</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Severity Badge Count */}
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {critical > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-red-500/15 text-red-400 border border-red-500/30">
                          {critical} Critical
                        </span>
                      )}
                      {high > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-orange-500/15 text-orange-400 border border-orange-500/30">
                          {high} High
                        </span>
                      )}
                      {medium > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {medium} Medium
                        </span>
                      )}
                      {low > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          {low} Low
                        </span>
                      )}
                      {!hasFindings && (
                        <span className="text-xs text-gray-500 italic">
                          No issues detected
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <Link
                      href={`/repo/${repo.id}/finding/${repo.topFindingId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/30 text-gray-300 hover:text-white border border-white/10 hover:border-indigo-500/40 transition-all duration-200"
                    >
                      <span>View Findings</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
