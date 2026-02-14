
import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Disc3, Settings, Crown } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Search, label: 'Search', id: 'search' },
    { icon: Library, label: 'Library', id: 'library' },
  ];

  return (
    <div className="hidden md:flex w-72 glass flex-col h-full border-r border-white/5 relative z-30">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Disc3 className="w-6 h-6 text-black animate-spin-slow" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white">VIBESTREAM</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-6">
          <h3 className="px-4 text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Main Menu</h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-white/10 text-white shadow-inner' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${currentView === item.id ? 'text-emerald-400' : 'group-hover:text-emerald-400'}`} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="px-4 text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Your Library</h3>
          <button className="flex items-center gap-4 w-full px-4 py-3 text-zinc-400 hover:text-white transition group hover:bg-white/5 rounded-xl">
            <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <PlusSquare className="w-4 h-4 group-hover:text-black" />
            </div>
            <span className="font-semibold text-sm">Create Playlist</span>
          </button>
          <button className="flex items-center gap-4 w-full px-4 py-3 text-zinc-400 hover:text-white transition group hover:bg-white/5 rounded-xl">
            <div className="w-5 h-5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded flex items-center justify-center shadow-lg">
              <Heart className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="font-semibold text-sm">Liked Songs</span>
          </button>
        </div>
      </nav>

      <div className="p-6">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-5 border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Premium</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed mb-4">Upgrade for high-fidelity audio & offline listening.</p>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-2.5 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20">
              Get 3 Months Free
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between px-2 text-zinc-500">
           <button className="hover:text-zinc-300 transition"><Settings className="w-4 h-4" /></button>
           <span className="text-[10px] font-medium opacity-50">v2.4.0-pro</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
