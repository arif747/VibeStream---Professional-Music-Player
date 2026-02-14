
import React from 'react';
import { Song } from '../types';
import { Play, Pause } from 'lucide-react';
import { useAudio } from '../store';

interface SongCardProps {
  song: Song;
  queue: Song[];
}

const SongCard: React.FC<SongCardProps> = ({ song, queue }) => {
  const { state, playSong } = useAudio();
  const isActive = state.currentSong?.id === song.id;
  const isPlaying = isActive && state.isPlaying;

  return (
    <div 
      className="group relative glass-light p-4 rounded-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-1"
      onClick={() => playSong(song, queue)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4 shadow-2xl">
        <img 
          src={song.cover_art} 
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className={`w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] transform transition-all duration-500 ${isPlaying ? 'scale-100' : 'scale-75 group-hover:scale-100'}`}>
            {isPlaying ? (
              <Pause className="w-7 h-7 text-black fill-current" />
            ) : (
              <Play className="w-7 h-7 text-black fill-current ml-1" />
            )}
          </div>
        </div>
        {song.play_count > 2000 && (
           <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
             HOT
           </div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className={`font-bold text-sm truncate mb-1.5 leading-tight ${isActive ? 'text-emerald-400' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-[11px] font-medium text-zinc-500 truncate group-hover:text-zinc-300 transition-colors uppercase tracking-wider">{song.artist_name}</p>
      </div>
    </div>
  );
};

export default SongCard;
