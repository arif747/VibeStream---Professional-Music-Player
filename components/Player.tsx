
import React, { useEffect, useRef } from 'react';
import { useAudio } from '../store';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Repeat, Shuffle, Heart } from 'lucide-react';
import Waveform from './Waveform';
import { api } from '../services/api';

const Player: React.FC = () => {
  const { state, togglePlay, nextSong, prevSong, setVolume, seekTo } = useAudio();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.currentSong && state.currentTime >= state.currentSong.duration_seconds - 5) {
      if (trackedRef.current !== state.currentSong.id) {
        api.songs.trackStream(state.currentSong.id);
        trackedRef.current = state.currentSong.id;
      }
    }
    if (state.currentSong && trackedRef.current !== state.currentSong.id && state.currentTime < 5) {
      trackedRef.current = null;
    }
  }, [state.currentTime, state.currentSong]);

  if (!state.currentSong) return null;

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (state.currentTime / state.currentSong.duration_seconds) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-white/5 px-6 flex items-center justify-between z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
        <div className="relative group cursor-pointer">
          <img 
            src={state.currentSong.cover_art} 
            alt={state.currentSong.title} 
            className="w-14 h-14 rounded-lg shadow-2xl object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
             <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="overflow-hidden flex-1">
          <h4 className="font-bold text-sm truncate text-white hover:underline cursor-pointer">{state.currentSong.title}</h4>
          <p className="text-xs text-zinc-400 truncate hover:text-zinc-200 cursor-pointer">{state.currentSong.artist_name}</p>
        </div>
        <button className="text-zinc-500 hover:text-emerald-400 transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Main Controls */}
      <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl px-8">
        <div className="flex items-center gap-8">
          <button className="text-zinc-500 hover:text-emerald-400 transition transform hover:scale-110"><Shuffle className="w-4 h-4" /></button>
          <button onClick={prevSong} className="text-zinc-300 hover:text-white transition transform hover:scale-110 active:scale-90"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button 
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            onClick={togglePlay}
          >
            {state.isPlaying ? (
              <Pause className="w-6 h-6 text-black fill-current" />
            ) : (
              <Play className="w-6 h-6 text-black fill-current ml-1" />
            )}
          </button>
          <button onClick={nextSong} className="text-zinc-300 hover:text-white transition transform hover:scale-110 active:scale-90"><SkipForward className="w-5 h-5 fill-current" /></button>
          <button className="text-zinc-500 hover:text-emerald-400 transition transform hover:scale-110"><Repeat className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-3 w-full text-[10px] font-mono text-zinc-500">
          <span className="w-8 text-right">{formatTime(state.currentTime)}</span>
          <div className="relative flex-1 h-1.5 bg-white/10 rounded-full group cursor-pointer overflow-hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-100" 
              style={{ width: `${progress}%` }}
            />
            <input 
              type="range"
              min="0"
              max={state.currentSong.duration_seconds}
              value={state.currentTime}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
          </div>
          <span className="w-8">{formatTime(state.currentSong.duration_seconds)}</span>
        </div>
      </div>

      {/* Side Tools */}
      <div className="hidden lg:flex items-center justify-end gap-6 w-1/4">
        <div className="flex flex-col items-center">
          <Waveform isPlaying={state.isPlaying} currentTime={state.currentTime} />
        </div>
        <div className="flex items-center gap-3 w-32 group">
          <Volume2 className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          <div className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
             <div 
                className="absolute left-0 top-0 bottom-0 bg-white group-hover:bg-emerald-500 transition-colors" 
                style={{ width: `${state.volume * 100}%` }}
             />
             <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
