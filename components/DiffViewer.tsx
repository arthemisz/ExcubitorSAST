import React from "react";
import { DiffLine } from "@/data/mockData";
import { GitPullRequest, Check, ShieldCheck } from "lucide-react";

interface DiffViewerProps {
  diff: DiffLine[];
}

export default function DiffViewer({ diff }: DiffViewerProps) {
  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden shadow-2xl flex flex-col">
      {/* Pane Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-gray-200">
            Suggested Remediation Patch
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            Parameterized SQL
          </span>
        </div>
      </div>

      {/* Unified Diff View */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed bg-black/40">
        <div className="min-w-full inline-block">
          <div className="text-gray-500 pb-2 select-none font-mono text-[11px]">
            @@ -10,8 +10,8 @@ router.post(&apos;/login&apos;, async (req, res) =&gt; &#123;
          </div>

          {diff.map((line, idx) => {
            const isAdd = line.type === "add";
            const isRemove = line.type === "remove";

            return (
              <div
                key={idx}
                className={`flex items-stretch select-text transition-colors ${
                  isAdd
                    ? "bg-emerald-500/15 border-l-2 border-emerald-500 text-emerald-200"
                    : isRemove
                    ? "bg-red-500/15 border-l-2 border-red-500 text-red-200"
                    : "text-gray-400 hover:bg-white/[0.02] border-l-2 border-transparent"
                }`}
              >
                {/* Old line number */}
                <span className="w-10 shrink-0 select-none text-right pr-2 py-0.5 text-[11px] text-gray-600">
                  {line.oldLineNumber || ""}
                </span>

                {/* New line number */}
                <span className="w-10 shrink-0 select-none text-right pr-3 py-0.5 text-[11px] text-gray-600 border-r border-white/5">
                  {line.newLineNumber || ""}
                </span>

                {/* Diff prefix symbol */}
                <span
                  className={`w-6 shrink-0 select-none text-center py-0.5 font-bold ${
                    isAdd
                      ? "text-emerald-400"
                      : isRemove
                      ? "text-red-400"
                      : "text-gray-600"
                  }`}
                >
                  {isAdd ? "+" : isRemove ? "-" : " "}
                </span>

                {/* Code content */}
                <span className="py-0.5 px-2 whitespace-pre flex-1 font-mono">
                  {line.content}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pane Footer */}
      <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] text-[11px] font-mono text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400">+3 lines added</span>
          <span className="text-red-400">-6 lines removed</span>
        </div>
        <button 
          onClick={() => alert("Mock action: Pull Request generated with safe remediation patch!")}
          className="text-[11px] px-2.5 py-1 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 font-sans font-medium transition-colors"
        >
          Create Auto-Fix PR
        </button>
      </div>
    </div>
  );
}
