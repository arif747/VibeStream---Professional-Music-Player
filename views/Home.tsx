
import React, { useEffect, useState } from 'react';
import { Song, Playlist } from '../types';
import { api } from '../services/api';
import SongCard from '../components/SongCard';
import { Disc3, Star, Clock, Loader2, ArrowLeft, Play, Sparkles, Download, Check } from 'lucide-react';
import { useAudio } from '../store';

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
  const [downloadedSongs, setDownloadedSongs] = useState<Set<string>>(new Set());
  const { playSong } = useAudio();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsData, playlistsData] = await Promise.all([
          api.songs.getAll(),
          api.playlists.getMine()
        ]);
        setSongs(songsData);
        setPlaylists(playlistsData);
      } catch (err) {
        console.error("Failed to fetch home data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlaylistClick = async (playlist: Playlist) => {
    setIsLoading(true);
    const data = await api.playlists.getSongs(playlist.id);
    setPlaylistSongs(data);
    setSelectedPlaylist(playlist);
    setIsLoading(false);
  };

  const handleDownloadTrack = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    setDownloadedSongs(prev => {
      const next = new Set(prev);
      next.add(songId);
      return next;
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", gradient: "from-emerald-900/40" };
    if (hour < 18) return { text: "Good Afternoon", gradient: "from-indigo-900/40" };
    return { text: "Good Evening", gradient: "from-purple-900/40" };
  };

  const greeting = getGreeting();

  if (isLoading && !selectedPlaylist) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (selectedPlaylist) {
    return (
      <div className="pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <button 
          onClick={() => setSelectedPlaylist(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition group px-4 py-2 hover:bg-white/5 rounded-full w-fit"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Discovery</span>
        </button>

        <div className="flex flex-col md:flex-row gap-10 items-end mb-12 px-2">
          <div className="relative group">
            <img src={selectedPlaylist.image_url} alt={selectedPlaylist.name} className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-emerald-400" />
               <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Curated Playlist</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">{selectedPlaylist.name}</h1>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
               <span className="text-white">Alex Vibe</span>
               <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
               <span>{playlistSongs.length} tracks</span>
               <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
               <span>2 hr 14 min</span>
            </div>
          </div>
        </div>

        <div className="glass-light rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-5 w-16">#</th>
                <th className="px-4 py-5">Title</th>
                <th className="px-4 py-5 hidden md:table-cell">Popularity</th>
                <th className="px-8 py-5 text-right"><Clock className="w-4 h-4 ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {playlistSongs.map((song, i) => (
                <tr 
                  key={song.id} 
                  className="group hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  onClick={() => playSong(song, playlistSongs)}
                >
                  <td className="px-8 py-4 text-zinc-500 font-mono text-xs w-16 group-hover:text-emerald-400">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <img src={song.cover_art} className="w-11 h-11 rounded-lg shadow-lg group-hover:scale-105 transition-transform" />
                      <div>
                        <div className="font-bold text-sm text-zinc-100 group-hover:text-emerald-400 transition-colors">{song.title}</div>
                        <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">{song.artist_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5 flex-1">
                          <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors" style={{width: `${(song.play_count / 160000) * 100}%`}}></div>
                          </div>
                          <span className="text-[10px] font-bold text-zinc-600">{song.play_count.toLocaleString()}</span>
                       </div>
                       <button 
                        onClick={(e) => handleDownloadTrack(e, song.id)}
                        className={`p-2 rounded-full transition-all ${downloadedSongs.has(song.id) ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}
                       >
                          {downloadedSongs.has(song.id) ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                       </button>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-zinc-500 text-xs font-mono text-right">
                    {Math.floor(song.duration_seconds / 60)}:{(song.duration_seconds % 60).toString().padStart(2, '0')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-32">
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-40 -left-20 w-[600px] h-[600px] bg-gradient-radial ${greeting.gradient} to-transparent blur-[120px] opacity-40 pointer-events-none`}></div>
      
      <div className="relative z-10 space-y-12">
        <header>
          <h1 className="text-4xl md:text-6xl font-black mb-10 text-white tracking-tighter">
            {greeting.text}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map(p => (
              <div 
                key={p.id} 
                onClick={() => handlePlaylistClick(p)}
                className="flex items-center glass-light rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 cursor-pointer group border border-white/5 hover:border-white/10"
              >
                <img src={p.image_url} alt={p.name} className="w-20 h-20 md:w-24 md:h-24 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="px-5 flex-1 flex items-center justify-between">
                  <p className="font-bold text-sm md:text-base text-zinc-100 group-hover:text-emerald-400 transition-colors">{p.name}</p>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              Featured Hits
            </h2>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-emerald-400 transition-colors">Show all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {songs.map(song => (
              <SongCard key={song.id} song={song} queue={songs} />
            ))}
          </div>
        </section>

        <section className="hidden xl:block">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-500" />
              Global Top Tracks
            </h2>
          </div>
          <div className="glass-light rounded-3xl p-2">
            <div className="space-y-1">
              {songs.slice(0, 4).map((song, i) => (
                <div 
                  key={song.id} 
                  onClick={() => playSong(song, songs)}
                  className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 group transition-all cursor-pointer"
                >
                  <span className="w-6 text-center text-xs text-zinc-600 font-black group-hover:text-emerald-500">{i + 1}</span>
                  <img src={song.cover_art} className="w-14 h-14 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{song.title}</p>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">{song.artist_name}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                     <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-tighter">{song.play_count.toLocaleString()} streams</span>
                     <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500/30" style={{width: `${(song.play_count / 160000) * 100}%`}}></div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <button 
                        onClick={(e) => handleDownloadTrack(e, song.id)}
                        className={`p-2 rounded-full transition-all ${downloadedSongs.has(song.id) ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/10'}`}
                     >
                        {downloadedSongs.has(song.id) ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                     </button>
                     <span className="text-xs text-zinc-600 font-mono w-12 text-right">
                        {Math.floor(song.duration_seconds / 60)}:{(song.duration_seconds % 60).toString().padStart(2, '0')}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
