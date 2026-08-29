"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldAlert, 
  FolderGit2, 
  Settings, 
  PlusCircle, 
  Scan, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [showScanModal, setShowScanModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => {
        setScanComplete(false);
        setShowScanModal(false);
      }, 1500);
    }, 2000);
  };

  const navItems = [
    {
      name: "Repositories",
      href: "/",
      icon: FolderGit2,
      active: pathname === "/" || pathname.startsWith("/repo")
    },
    {
      name: "Settings",
      href: "#settings",
      icon: Settings,
      active: pathname === "/settings"
    }
  ];

  return (
    <>
      <aside className="w-64 min-h-screen bg-gray-950/90 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Logo Placeholder */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-wider uppercase">Sentinel</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SAST
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">v0.1.0 • Engine Ready</p>
            </div>
          </div>

          {/* New Scan Trigger Button */}
          <div className="p-4">
            <button
              onClick={() => setShowScanModal(true)}
              className="w-full relative group overflow-hidden rounded-xl p-[1px] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:opacity-100 opacity-80" />
              <span className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-[11px] bg-gray-950/80 backdrop-blur-sm transition-colors duration-200 group-hover:bg-gray-900/60 text-white text-sm font-semibold">
                <PlusCircle className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform duration-300" />
                <span>New Scan</span>
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1.5 mt-2">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? "bg-white/10 text-white shadow-sm border border-white/10 backdrop-blur-md"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.active ? "text-indigo-400" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Engine Status footer */}
        <div className="p-4 border-t border-white/5 m-3 rounded-xl bg-white/[0.02] border">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-200 truncate">Static Rule Engine</p>
              <p className="text-[11px] text-gray-400 font-mono truncate">Local Mock Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* New Scan Modal */}
      {showScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-gray-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Scan className="w-5 h-5 text-indigo-400" />
              Trigger SAST Analysis
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Select an onboarded Git repository to queue an immediate static AST scan.
            </p>

            <div className="space-y-3 mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Target Repository</label>
              <select className="w-full bg-gray-950 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500">
                <option value="auth-service-api">backend/auth-service-api (branch: main)</option>
                <option value="payment-gateway">services/payment-gateway (branch: master)</option>
                <option value="customer-portal-web">frontend/customer-portal-web (branch: develop)</option>
                <option value="infra-terraform-modules">cloud/infra-terraform-modules (branch: main)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isScanning}
                onClick={() => setShowScanModal(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isScanning || scanComplete}
                onClick={handleStartScan}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing AST...</span>
                  </>
                ) : scanComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Scan Queued!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
