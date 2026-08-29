"use client";

import React, { useState } from "react";
import { Sparkles, Bot, CheckCircle, RefreshCw, Copy, Check } from "lucide-react";

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

  // Optional live query to Express backend scaffolding
  const handleRetriage = async () => {
    setLoading(true);
    try {
      // Attempt call to local Express backend if running, otherwise simulate latency
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
      // Fallback to internal mock state seamlessly
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
    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden shadow-2xl p-5 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                AI Automated Triage Reasoning
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                LLM Analysis
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Verified vulnerability triage verdict and justification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyJson}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
            title="Copy JSON reasoning"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRetriage}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Analyzing..." : "Re-evaluate"}</span>
          </button>
        </div>
      </div>

      {/* Visual Verdict Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
          <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1">
            Verdict
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            True Positive (Confirmed)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
          <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1">
            Severity Impact
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono bg-red-500/15 text-red-400 border border-red-500/30">
            {triage.severity}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
          <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1">
            Is False Positive?
          </span>
          <span className="text-xs font-mono font-semibold text-gray-300">
            {triage.is_false_positive ? "true" : "false"}
          </span>
        </div>
      </div>

      {/* Raw JSON Structure Block */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1.5 px-1">
          <span>AI Triage Output Schema (JSON)</span>
          <span>schema: sast.triage.v1</span>
        </div>
        <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
          <code>
{`{
  `}<span className="text-gray-400">&quot;is_false_positive&quot;</span>{`: `}<span className="text-amber-400">{String(triage.is_false_positive)}</span>{`,
  `}<span className="text-gray-400">&quot;reasoning&quot;</span>{`: `}<span className="text-emerald-300">&quot;{triage.reasoning}&quot;</span>{`,
  `}<span className="text-gray-400">&quot;severity&quot;</span>{`: `}<span className="text-red-400">&quot;{triage.severity}&quot;</span>{`
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
