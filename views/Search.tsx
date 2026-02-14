
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Sparkles, Loader2, Disc3 } from 'lucide-react';
import { Song, Artist, Album } from '../types';
import { api } from '../services/api';
import SongCard from '../components/SongCard';
import { GoogleGenAI } from "@google/genai";

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ songs: Song[], artists: Artist[], albums: Album[] }>({ songs: [], artists: [], albums: [] });
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) {
        setResults({ songs: [], artists: [], albums: [] });
        return;
      }
      setIsSearching(true);
      const data = await api.search(query);
      setResults(data);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  const getAiRecommendation = async () => {
    if (!query) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I'm searching for music related to "${query}". Give me a brief, catchy recommendation of genres or specific famous artists I might like based on this. Keep it under 50 words.`,
      });
      setAiInsight(response.text);
    } catch (err) {
      console.error(err);
      setAiInsight("Unable to get AI insights at this time.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-32">
      <div className="sticky top-0 pt-8 pb-6 bg-black/60 backdrop-blur-2xl z-20 -mx-8 px-8">
        <div className="relative max-w-3xl">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="What do you want to listen to?"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-14 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none focus:bg-white/10 text-base font-bold transition-all placeholder:text-zinc-500 shadow-2xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getAiRecommendation()}
          />
          {isSearching && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
               <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {query && (
        <div className="ai-gradient rounded-[32px] p-10 relative overflow-hidden group shadow-2xl">
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-colors duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <Sparkles className="w-5 h-5 text-black" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-white leading-none">Smart Music Insight</h3>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mt-1">Powered by Gemini AI</p>
                 </div>
              </div>
              <button 
                onClick={getAiRecommendation}
                disabled={isAiLoading}
                className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full transition-all flex items-center gap-2 text-xs font-bold border border-white/10 active:scale-95 disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refine Analysis'}
              </button>
            </div>
            
            <div className="max-w-4xl">
              {isAiLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/5 rounded-full w-full"></div>
                  <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
                  <div className="h-4 bg-white/5 rounded-full w-4/6"></div>
                </div>
              ) : (
                <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed italic">
                  {aiInsight || "Type a mood, artist, or genre and let the AI find your next favorite vibe..."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-black tracking-tight">
             {query ? `Results for "${query}"` : "Browse Categories"}
           </h2>
        </div>
        
        {results.songs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.songs.map(song => (
              <SongCard key={song.id} song={song} queue={results.songs} />
            ))}
          </div>
        ) : (
          !isSearching && !query && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {['Chill', 'Focus', 'Party', 'Sleep', 'Romance', 'Rock', 'Electronic', 'Jazz'].map(genre => (
                  <div 
                    key={genre}
                    onClick={() => setQuery(genre)}
                    className="aspect-video glass-light rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all border border-white/5 group overflow-hidden relative"
                  >
                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-emerald-500/5 group-hover:scale-110 transition-transform duration-700"></div>
                     <span className="text-xl font-black tracking-tighter relative z-10 group-hover:text-emerald-400 transition-colors">{genre}</span>
                  </div>
               ))}
            </div>
          )
        )}

        {query && results.songs.length === 0 && !isSearching && (
           <div className="text-center py-24 glass-light rounded-[32px] border border-white/5">
             <Disc3 className="w-16 h-16 text-zinc-800 mx-auto mb-6 animate-pulse" />
             <h4 className="text-xl font-bold text-zinc-400">Couldn't find anything...</h4>
             <p className="text-sm text-zinc-600 mt-2">Try searching for something else or ask AI for a hint.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Search;
