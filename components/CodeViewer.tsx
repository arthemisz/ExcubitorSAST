import React from "react";
import { FileCode, AlertTriangle } from "lucide-react";

interface CodeLine {
  lineNumber: number;
  code: string;
  isVulnerable: boolean;
}

interface CodeViewerProps {
  filePath: string;
  lines: CodeLine[];
}

export default function CodeViewer({ filePath, lines }: CodeViewerProps) {
  return (
    <div className="rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col h-full">
      {/* Pane Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-4 h-4 text-gray-400" />
          <span className="font-mono text-xs tracking-wider text-gray-200">
            {filePath}
          </span>
        </div>
        <div>
          {/* Perfectly pill-shaped status indicator */}
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-red-500/30 text-red-300 bg-red-500/5">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            Lines 11-15 Flagged
          </span>
        </div>
      </div>

      {/* Code Viewer Body */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed flex-1 bg-black/40">
        <div className="min-w-full inline-block">
          {lines.map((line) => {
            return (
              <div
                key={line.lineNumber}
                className={`flex items-stretch group transition-colors ${
                  line.isVulnerable
                    ? "bg-red-500/15 border-l-2 border-red-500 text-red-100"
                    : "text-gray-400 hover:bg-white/[0.02] border-l-2 border-transparent"
                }`}
              >
                {/* Line Number */}
                <span
                  className={`w-12 shrink-0 select-none text-right pr-4 py-0.5 font-mono text-[11px] tracking-wider ${
                    line.isVulnerable
                      ? "text-red-400 font-semibold"
                      : "text-gray-600 group-hover:text-gray-400"
                  }`}
                >
                  {line.lineNumber}
                </span>

                {/* Code Content */}
                <span className="py-0.5 px-2 whitespace-pre flex-1 font-mono text-gray-300">
                  {line.code || " "}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pane Footer metadata */}
      <div className="px-6 py-2.5 border-t border-white/10 font-mono text-[10px] tracking-widest uppercase text-gray-400 flex items-center justify-between">
        <span>AST Scope: CommonJS Express Route</span>
        <span>20 Lines Total</span>
      </div>
    </div>
  );
}
