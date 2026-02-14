
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song, PlayState } from './types';

interface AudioContextType {
  state: PlayState;
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  seekTo: (time: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayState>({
    currentSong: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    queue: [],
  });

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    const handleEnded = () => nextSong();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [state.queue, state.currentSong]);

  const playSong = (song: Song, queue: Song[] = []) => {
    const audio = audioRef.current;
    
    if (state.currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    // Fix: Access file_url using snake_case as defined in Song interface
    audio.src = song.file_url;
    audio.volume = state.volume;
    audio.play().catch(e => console.error("Playback failed", e));
    
    setState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      queue: queue.length > 0 ? queue : prev.queue,
      currentTime: 0
    }));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!state.currentSong) return;

    if (state.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Playback failed", e));
    }
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const setVolume = (v: number) => {
    audioRef.current.volume = v;
    setState(prev => ({ ...prev, volume: v }));
  };

  const seekTo = (time: number) => {
    audioRef.current.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const nextSong = () => {
    if (state.queue.length === 0 || !state.currentSong) return;
    const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
    const nextIndex = (currentIndex + 1) % state.queue.length;
    playSong(state.queue[nextIndex]);
  };

  const prevSong = () => {
    if (state.queue.length === 0 || !state.currentSong) return;
    const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
    const prevIndex = (currentIndex - 1 + state.queue.length) % state.queue.length;
    playSong(state.queue[prevIndex]);
  };

  return (
    <AudioContext.Provider value={{ state, playSong, togglePlay, setVolume, seekTo, nextSong, prevSong, audioRef }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
