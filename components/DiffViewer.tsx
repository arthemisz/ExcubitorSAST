import React from "react";
import { DiffLine } from "@/data/mockData";
import { GitPullRequest, ShieldCheck, Check } from "lucide-react";

interface DiffViewerProps {
  diff: DiffLine[];
}

export default function DiffViewer({ diff }: DiffViewerProps) {
  return (
    <div className="rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col">
      {/* Pane Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GitPullRequest className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs tracking-wider text-gray-200">
            Suggested Remediation Patch
          </span>
        </div>
        <div>
          {/* Perfectly pill-shaped indicator */}
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-emerald-500/30 text-emerald-300 bg-emerald-500/5">
            <ShieldCheck className="w-3 h-3" />
            Parameterized AST
          </span>
        </div>
      </div>

      {/* Unified Diff View */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed bg-black/40">
        <div className="min-w-full inline-block">
          <div className="text-gray-600 pb-2 select-none font-mono text-[11px] tracking-wider">
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
                <span className="w-10 shrink-0 select-none text-right pr-2 py-0.5 font-mono text-[11px] text-gray-600">
                  {line.oldLineNumber || ""}
                </span>

                {/* New line number */}
                <span className="w-10 shrink-0 select-none text-right pr-3 py-0.5 font-mono text-[11px] text-gray-600 border-r border-white/10">
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

      {/* Pane Footer with Pill Action Button */}
      <div className="px-6 py-3 border-t border-white/10 font-mono text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[11px] tracking-widest uppercase">
          <span className="text-emerald-400">+3 Lines Added</span>
          <span className="text-red-400">-6 Lines Removed</span>
        </div>
        {/* Primary Action Button: Pill-shaped with soft linear gradient from muted blue to pale green */}
        <button 
          onClick={() => alert("Remediation Patch staged for auto-PR generation.")}
          className="rounded-full bg-gradient-to-r from-blue-400/80 to-emerald-400/80 px-5 py-1.5 font-mono text-xs tracking-widest uppercase text-white hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Apply Patch PR</span>
        </button>
      </div>
    </div>
  );
}
