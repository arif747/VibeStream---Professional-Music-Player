
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Player from './components/Player';
import Home from './views/Home';
import Search from './views/Search';
import { AudioProvider } from './store';
import { Bell, ChevronLeft, ChevronRight, Loader2, User as UserIcon } from 'lucide-react';
import { api } from './services/api';
import { User as UserType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const initApp = async () => {
      const profile = await api.auth.getProfile();
      setUser(profile);
    };
    initApp();
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'home': return <Home />;
      case 'search': return <Search />;
      case 'library': return <div className="flex items-center justify-center h-full text-zinc-600 font-bold uppercase tracking-widest">Library is empty</div>;
      default: return <Home />;
    }
  };

  if (!user) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="relative">
           <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(16,185,129,0.3)]">
             <span className="text-black font-black text-4xl">V</span>
           </div>
           <div className="absolute -inset-4 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
        </div>
        <div className="flex items-center gap-3">
           <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />
           <span className="text-zinc-500 font-black text-xs uppercase tracking-[0.4em]">Initializing</span>
        </div>
      </div>
    );
  }

  return (
    <AudioProvider>
      <div className="flex h-screen bg-[#000] overflow-hidden relative">
        {/* Desktop Sidebar */}
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-zinc-900/10 via-black to-black overflow-y-auto">
          {/* Top Header Navigation */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-5 transition-all duration-300">
            <div className="flex items-center gap-4">
              <button className="flex w-10 h-10 rounded-full glass-light items-center justify-center hover:bg-white/10 transition text-zinc-400 hover:text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="flex w-10 h-10 rounded-full glass-light items-center justify-center hover:bg-white/10 transition text-zinc-400 hover:text-white">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass-light rounded-full border border-emerald-500/20">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Stream Pro Active</span>
              </div>
              
              <button className="p-2.5 text-zinc-400 hover:text-white transition relative glass-light rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black"></span>
              </button>
              
              <div className="flex items-center gap-3 glass-light hover:bg-white/10 transition p-1.5 pr-5 rounded-full cursor-pointer group border border-white/5">
                <div className="relative">
                  <img src={user.avatar_url} alt="User" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-emerald-500/50 transition-all" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>
                </div>
                <span className="hidden sm:inline text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{user.username}</span>
              </div>
            </div>
          </header>

          <main className="flex-1 px-8 pt-2 overflow-x-hidden">
            <div className="animate-in fade-in zoom-in-95 duration-500 h-full">
              {renderView()}
            </div>
          </main>
        </div>

        {/* Mobile Navigation Bar */}
        <MobileNav currentView={currentView} onViewChange={setCurrentView} />

        {/* Playback Bar */}
        <Player />
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
          animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </AudioProvider>
  );
};

export default App;
