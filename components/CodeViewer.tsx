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
    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Pane Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-medium text-gray-200">
            {filePath}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="w-3 h-3" />
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
                    : "text-gray-300 hover:bg-white/[0.02] border-l-2 border-transparent"
                }`}
              >
                {/* Line Number */}
                <span
                  className={`w-12 shrink-0 select-none text-right pr-4 py-0.5 text-[11px] ${
                    line.isVulnerable
                      ? "text-red-400 font-semibold"
                      : "text-gray-600 group-hover:text-gray-400"
                  }`}
                >
                  {line.lineNumber}
                </span>

                {/* Code Content */}
                <span className="py-0.5 px-2 whitespace-pre flex-1 font-mono">
                  {line.code || " "}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pane Footer metadata */}
      <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] text-[11px] font-mono text-gray-500 flex items-center justify-between">
        <span>Language: JavaScript (CommonJS)</span>
        <span>20 lines total</span>
      </div>
    </div>
  );
}
