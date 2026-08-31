import React from "react";
import Link from "next/link";
import { Repository } from "@/data/mockData";
import { 
  GitBranch, 
  Clock, 
  Check, 
  X, 
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

interface RepoTableProps {
  repositories: Repository[];
}

export default function RepoTable({ repositories }: RepoTableProps) {
  return (
    <div className="rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-sans font-bold text-white text-xl tracking-tight">
              Monitored Repositories
            </h2>
            <span className="rounded-full border border-white/20 px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase text-gray-300">
              {repositories.length} Active
            </span>
          </div>
          <p className="font-mono text-xs text-gray-400 tracking-wider mt-1">
            Continuous static AST engine inspection &amp; vulnerability index
          </p>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-widest text-gray-400">
              <th className="py-4 px-6">Repository</th>
              <th className="py-4 px-6">Last Scan</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Severity Breakdown</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {repositories.map((repo) => {
              const isPass = repo.status === "Pass";
              const { critical, high, medium, low } = repo.findingsCount;
              const hasFindings = critical + high + medium + low > 0;

              return (
                <tr
                  key={repo.id}
                  className="group hover:bg-white/[0.02] transition-colors duration-150"
                >
                  {/* Repo Name & Branch */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-full border ${
                        isPass 
                          ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/5" 
                          : "border-red-500/30 text-red-300 bg-red-500/5"
                      }`}>
                        {isPass ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <Link 
                          href={`/repo/${repo.id}/finding/${repo.topFindingId}`}
                          className="font-mono text-sm tracking-wide text-white group-hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{repo.name}</span>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
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
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-300">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span>{repo.lastScanTime}</span>
                    </div>
                  </td>

                  {/* Status (Pass / Fail pill) */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase border ${
                        isPass
                          ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/5"
                          : "border-red-500/30 text-red-300 bg-red-500/5"
                      }`}
                    >
                      {isPass ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Pass</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 text-red-400" />
                          <span>Fail</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Severity Badge Count (All pill-shaped) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {critical > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-red-500/30 text-red-300 bg-red-500/5">
                          {critical} Critical
                        </span>
                      )}
                      {high > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-orange-500/30 text-orange-300 bg-orange-500/5">
                          {high} High
                        </span>
                      )}
                      {medium > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-amber-500/30 text-amber-300 bg-amber-500/5">
                          {medium} Medium
                        </span>
                      )}
                      {low > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-blue-500/30 text-blue-300 bg-blue-500/5">
                          {low} Low
                        </span>
                      )}
                      {!hasFindings && (
                        <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">
                          Clean
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Secondary Action Pill Button */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <Link
                      href={`/repo/${repo.id}/finding/${repo.topFindingId}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-transparent text-white font-mono tracking-widest text-xs uppercase px-4 py-1.5 hover:bg-white/5 hover:border-white/40 transition-all duration-200"
                    >
                      <span>View Finding</span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
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
