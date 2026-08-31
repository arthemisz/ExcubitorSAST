"use client";

import React, { useState } from "react";
import { Sparkles, Bot, RefreshCw, Copy, Check } from "lucide-react";

interface AiTriageCardProps {
  initialTriage: {
    is_false_positive: boolean;
    reasoning: string;
    severity: string;
  };
}

export default function AiTriageCard({ initialTriage }: AiTriageCardProps) {
  const [triage, setTriage] = useState(initialTriage);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRetriage = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/scan/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ findingId: "vuln-sql-001" })
      });
      if (res.ok) {
        const data = await res.json();
        setTriage(data);
      }
    } catch {
      setTriage({
        is_false_positive: false,
        reasoning: "The input is not sanitized before database execution, leading to SQL injection.",
        severity: "Critical"
      });
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(triage, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full border border-white/15 bg-white/[0.03] text-gray-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-sans font-bold text-white text-base">
                AI Automated Triage Reasoning
              </h3>
              {/* Perfectly pill-shaped indicator */}
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-white/20 text-gray-300">
                <Sparkles className="w-2.5 h-2.5 text-gray-300" />
                LLM Verdict
              </span>
            </div>
            <p className="font-mono text-xs text-gray-400 tracking-wider mt-0.5">
              Automated false positive assessment &amp; semantic root-cause
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Secondary Action Pill Button: Copy */}
          <button
            onClick={copyJson}
            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/5 transition-all"
            title="Copy JSON reasoning"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
          </button>

          {/* Secondary Action Pill Button: Re-evaluate */}
          <button
            onClick={handleRetriage}
            disabled={loading}
            className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs tracking-widest uppercase text-white hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Evaluating" : "Re-evaluate"}</span>
          </button>
        </div>
      </div>

      {/* Visual Verdict Summary with Pill Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-2xl border border-white/10 bg-black/40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
            Verdict
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            True Positive
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-white/10 bg-black/40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
            Severity Impact
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-red-500/30 text-red-300 bg-red-500/5">
            {triage.severity}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-white/10 bg-black/40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
            Is False Positive?
          </span>
          <span className="font-mono text-xs tracking-widest text-gray-300">
            {triage.is_false_positive ? "TRUE" : "FALSE"}
          </span>
        </div>
      </div>

      {/* Raw JSON Structure Block */}
      <div>
        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-2 px-1">
          <span>AI Triage Output Schema (JSON)</span>
          <span>sast.triage.v1</span>
        </div>
        <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
          <code>
{`{
  `}<span className="text-gray-500">&quot;is_false_positive&quot;</span>{`: `}<span className="text-amber-300">{String(triage.is_false_positive)}</span>{`,
  `}<span className="text-gray-500">&quot;reasoning&quot;</span>{`: `}<span className="text-emerald-300">&quot;{triage.reasoning}&quot;</span>{`,
  `}<span className="text-gray-500">&quot;severity&quot;</span>{`: `}<span className="text-red-400">&quot;{triage.severity}&quot;</span>{`
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
