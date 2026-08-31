// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col h-screen sticky top-0 z-20">
      <div className="p-8">
        <h1 className="text-2xl font-sans font-bold text-white tracking-tight flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-gradient-to-tr from-blue-400 to-emerald-400"></div>
          Cybee
        </h1>
      </div>
      
      {/* Navigation Links (Matching your mono font preference) */}
      <nav className="flex-1 px-6 space-y-3 mt-4 font-mono text-sm tracking-widest">
        <button className="w-full bg-gradient-to-r from-blue-400/90 to-emerald-400/90 text-black py-3 px-4 rounded-full font-bold transition-opacity hover:opacity-90 mb-8">
          + New Scan
        </button>
        
        <Link href="/" className="block px-4 py-3 rounded-full bg-white/5 text-white border border-white/10">
          Repositories
        </Link>
        <Link href="#" className="block px-4 py-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent">
          Products
        </Link>
        <Link href="#" className="block px-4 py-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent">
          Resources
        </Link>
      </nav>
      
      <div className="p-8 border-t border-white/10 text-xs font-mono text-gray-500 tracking-widest uppercase">
        Melekte • Admin
      </div>
    </aside>
  );
}