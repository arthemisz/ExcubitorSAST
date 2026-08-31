import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-mono text-gray-300">
      
      {/* 1. Ambient Atmospheric Radial Gradients (Purple & Yellow) */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-purple-900/40 blur-[130px] -translate-y-1/4 translate-x-1/4 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-yellow-700/20 blur-[140px] translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />

      {/* 2. Top Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-8 text-sm">
        <div className="flex items-center gap-2 text-white font-sans font-bold text-xl tracking-wide">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-yellow-500 to-purple-600"></div>
          Excubitor
        </div>
        <div className="hidden md:flex gap-12 tracking-wider">
          <Link href="./dashboard" className="hover:text-white transition-colors">Products</Link>
          <Link href="./scans" className="hover:text-white transition-colors">Scans</Link>
          <Link href="./resources" className="hover:text-white transition-colors">Resources</Link>
          <Link href="./partners" className="hover:text-white transition-colors">Partners</Link>
        </div>
        <button className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors tracking-widest">
          Contact Us
        </button>
      </nav>

      {/* 3. Central Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto mt-4">
        
        {/* Floating Accent Text */}
        <div className="absolute top-0 flex w-full justify-between px-10 text-xs tracking-widest text-gray-400">
          <span className="ml-auto ">Safeguarding Excubitor .</span>
        </div>

        {/* The Massive Background Text */}
        <h1 className="absolute z-0 text-[14vw] leading-none font-sans font-medium text-white tracking-tight w-full text-center select-none uppercase">
          EXCUBITOR
        </h1>

        <div className="relative z-10 w-[550px] h-[450px] flex items-center justify-center mt-12 drop-shadow-[0_20px_50px_rgba(168,85,247,0.15)]">
          <Image 
            src="/lock.png" 
            alt="Excubitor Security Lock" 
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Call to Action Buttons */}
        <div className="relative z-20 mt-12 flex items-center gap-8 text-sm tracking-widest">
          <button className="hover:text-white transition-colors">
            Request Info
          </button>
          {/* This button now correctly routes to your separated dashboard component */}
          <Link 
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-grey-500 to-yellow-500 text-black font-bold hover:opacity-90 transition-opacity">
            Get Started Now
          </Link>
        </div>
      </main>

      {/* 4. Footer Stats & Logos */}
      <footer className="relative z-20 flex items-end justify-between px-10 pb-10 mt-auto">
        <div className="flex items-center gap-8 text-sm">
          <div>
            <div className="text-2xl font-sans font-medium text-white mb-1">818</div>
            <div className="tracking-widest text-gray-400">Clients</div>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div>
            <div className="text-2xl font-sans font-medium text-white mb-1">70+</div>
            <div className="tracking-widest text-gray-400">Country</div>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="text-xs text-gray-400 max-w-[200px] leading-relaxed tracking-wide">
            We're dedicated<br/> to safeguarding<br/> Excubitor assets
          </div>
        </div>

        {/* Mock Client Logos (Excubitor themed) */}
        <div className="flex gap-6 opacity-60">
          <div className="font-bold font-sans flex items-center gap-1">
            Excubitor <span className="text-xl text-yellow-500">✿</span>
          </div>
          <div className="font-bold font-sans italic tracking-tighter text-purple-400">
            excubitor
          </div>
          <div className="font-bold font-sans flex items-center gap-1">
            <span className="text-xl">❖</span> Excubitor
          </div>
        </div>
      </footer>

    </div>
  );
}