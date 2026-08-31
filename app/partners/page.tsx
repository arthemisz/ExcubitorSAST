import React from "react";
import { Handshake, Terminal, Mail, Code2 } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="w-full text-gray-300 font-mono space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-sans font-bold text-white">Partners & Collaborations</h1>
        <p className="text-sm text-gray-500 mt-2">An independent security project built to scale.</p>
      </header>

      {/* 1. About the Solo Project */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Terminal className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold font-sans">The Excubitor Project</h2>
        </div>
        <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl leading-relaxed text-sm">
          <p>
            Excubitor SAST is currently developed and maintained as an independent project by a solo developer. 
            The goal is to provide fast, reliable, and accessible static application security testing without the bloat of traditional enterprise software. 
          </p>
          <p className="mt-4">
            Because this is an independent initiative, agility and transparency are prioritized over corporate bureaucracy.
          </p>
        </div>
      </section>

      {/* 2. Technology Stack */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Code2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold font-sans">Technology Stack</h2>
        </div>
        <p className="text-sm text-gray-500">We stand on the shoulders of giants. Excubitor is powered by these foundational technologies:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg">
            <h3 className="text-white font-bold mb-1">OWASP Foundation</h3>
            <p className="text-xs text-gray-500">Core vulnerability definitions</p>
          </div>
          <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg">
            <h3 className="text-white font-bold mb-1">Next.js & React</h3>
            <p className="text-xs text-gray-500">Frontend architecture</p>
          </div>
          <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg">
            <h3 className="text-white font-bold mb-1">Vercel</h3>
            <p className="text-xs text-gray-500">Edge network deployment</p>
          </div>
        </div>
      </section>

      {/* 3. Call to Action */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Handshake className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold font-sans">Become a Partner</h2>
        </div>
        <div className="p-6 border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-sm rounded-xl text-sm">
          <p className="mb-4 text-gray-300">
            Excubitor is actively seeking strategic partnerships. If you represent a cybersecurity firm, an open-source initiative, or are looking to integrate a SAST engine into your CI/CD pipelines, let's talk.
          </p>
          <a 
            href="https://www.linkedin.com/in/melekte-ermias" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </a>
        </div>
      </section>

    </div>
  );
}