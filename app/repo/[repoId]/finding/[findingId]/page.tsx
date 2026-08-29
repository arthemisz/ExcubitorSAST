import React from "react";
import Link from "next/link";
import CodeViewer from "@/components/CodeViewer";
import DiffViewer from "@/components/DiffViewer";
import AiTriageCard from "@/components/AiTriageCard";
import { MOCK_FINDING } from "@/data/mockData";
import { 
  ArrowLeft, 
  ShieldAlert, 
  FileCode2, 
  GitBranch, 
  GitCommit, 
  ExternalLink,
  Info
} from "lucide-react";

export default function FindingDetailPage() {
  const finding = MOCK_FINDING;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Navigation Breadcrumb & Back button */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span>Finding ID:</span>
          <span className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {finding.id}
          </span>
        </div>
      </div>

      {/* Header View */}
      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* File Path & Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 font-mono">
              <span className="text-indigo-400 font-semibold">{finding.repoName}</span>
              <span>/</span>
              <span className="text-gray-200">{finding.filePath}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <FileCode2 className="w-7 h-7 text-red-400 shrink-0" />
              <span>{finding.title}</span>
            </h1>
          </div>

          {/* High Severity Red Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold font-mono uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 shadow-lg shadow-red-500/20">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Critical Severity</span>
            </span>
          </div>
        </div>

        {/* CWE & Metadata pill row */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-gray-300 font-mono">{finding.cwe}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5 font-mono">
            <GitCommit className="w-3.5 h-3.5 text-gray-500" />
            <span>Commit: {finding.introducedCommit}</span>
          </div>
        </div>
      </div>

      {/* Split Layout: Two-column responsive CSS grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Pane (Context): 20 lines of mock vulnerable code */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Vulnerable Code Context (Source AST)
            </h2>
            <span className="text-[11px] text-gray-500 font-mono">Read-Only</span>
          </div>
          <CodeViewer
            filePath={finding.filePath}
            lines={finding.codeSnippet}
          />
        </div>

        {/* Right Pane (Remediation): Unified diff patch + AI JSON reasoning */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Recommended Patch & Remediation
              </h2>
              <span className="text-[11px] text-emerald-400 font-mono">Ready to Apply</span>
            </div>
            <DiffViewer diff={finding.diffPatch} />
          </div>

          {/* AI JSON Reasoning Glassmorphic Card */}
          <AiTriageCard initialTriage={finding.aiTriage} />
        </div>
      </div>
    </div>
  );
}
