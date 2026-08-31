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
  GitCommit, 
  Info,
  Check
} from "lucide-react";

export default function FindingDetailPage() {
  const finding = MOCK_FINDING;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Navigation Breadcrumb / Secondary Action Pill */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-1.5 font-mono text-xs tracking-widest uppercase text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-xs text-gray-400 tracking-widest uppercase">
          <span>Finding:</span>
          <span className="text-white border border-white/20 rounded-full px-3 py-0.5 bg-white/[0.02]">
            {finding.id}
          </span>
        </div>
      </div>

      {/* Header View with Wireframe Panel */}
      <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* File Path & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-widest text-gray-400 uppercase">
              <span className="text-gray-300">{finding.repoName}</span>
              <span>/</span>
              <span className="text-white font-semibold">{finding.filePath}</span>
            </div>
            {/* Clean, wide sans-serif font for large headings, heavily weighted and stark white */}
            <h1 className="font-sans font-extrabold text-white text-2xl md:text-3xl tracking-tight flex items-center gap-3">
              <FileCode2 className="w-7 h-7 text-white shrink-0" />
              <span>{finding.title}</span>
            </h1>
          </div>

          {/* High Severity Red Badge (Perfect pill) */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase border border-red-500/30 text-red-300 bg-red-500/5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Critical Severity</span>
            </span>
          </div>
        </div>

        {/* CWE & Metadata pill row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-2 border border-white/15 px-3.5 py-1 rounded-full bg-white/[0.02]">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-300 tracking-wider">{finding.cwe}</span>
          </div>
          <div className="flex items-center gap-2 border border-white/15 px-3.5 py-1 rounded-full bg-white/[0.02] tracking-widest uppercase">
            <GitCommit className="w-3.5 h-3.5 text-gray-500" />
            <span>Commit: {finding.introducedCommit}</span>
          </div>
        </div>
      </div>

      {/* Split Layout: Two-column responsive CSS grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Pane (Context): 20 lines of mock vulnerable code */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-mono text-xs tracking-widest uppercase text-gray-400">
              Vulnerable Code Context (Source AST)
            </h2>
            <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500">
              Read-Only
            </span>
          </div>
          <CodeViewer
            filePath={finding.filePath}
            lines={finding.codeSnippet}
          />
        </div>

        {/* Right Pane (Remediation): Unified diff patch + AI JSON reasoning */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-mono text-xs tracking-widest uppercase text-gray-400">
                Recommended Patch &amp; Remediation
              </h2>
              <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-400">
                Verified Safe
              </span>
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
