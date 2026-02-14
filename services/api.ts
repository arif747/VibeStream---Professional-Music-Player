
import { mockSongs, mockArtists, mockAlbums, mockPlaylists, mockUsers, mockPlaylistSongs } from './mockData';
import { Song, Artist, Album, Playlist, User, PlaylistSong } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * SIMULATED BACKEND API
 * Mirroring the REST architecture proposed:
 * A. Auth & User
 * B. Music Discovery
 * C. Playlists & Interaction
 */
export const api = {
  // A. Auth & User
  auth: {
    register: async (data: any): Promise<User> => {
      await delay(800);
      return mockUsers[0];
    },
    login: async (credentials: any): Promise<{ user: User, token: string }> => {
      await delay(600);
      return { user: mockUsers[0], token: 'fake-jwt-token' };
    },
    getProfile: async (): Promise<User> => {
      await delay(300);
      return mockUsers[0];
    }
  },

  // B. Music Discovery
  songs: {
    // GET /api/songs
    getAll: async (genre?: string): Promise<Song[]> => {
      await delay(400);
      if (genre) return mockSongs.filter(s => s.genre?.toLowerCase() === genre.toLowerCase());
      return mockSongs;
    },
    // GET /api/songs/:id
    getById: async (id: string): Promise<Song | undefined> => {
      await delay(200);
      return mockSongs.find(s => s.id === id);
    },
    // PATCH /api/songs/:id/stream
    trackStream: async (id: string): Promise<void> => {
      const song = mockSongs.find(s => s.id === id);
      if (song) song.play_count += 1;
    }
  },

  // GET /api/search?q=judul
  search: async (query: string): Promise<{ songs: Song[], artists: Artist[], albums: Album[] }> => {
    await delay(600);
    const q = query.toLowerCase();
    return {
      songs: mockSongs.filter(s => s.title.toLowerCase().includes(q)),
      artists: mockArtists.filter(a => a.name.toLowerCase().includes(q)),
      albums: mockAlbums.filter(al => al.title.toLowerCase().includes(q))
    };
  },

  albums: {
    // GET /api/albums/:id/songs
    getSongs: async (albumId: string): Promise<Song[]> => {
      await delay(300);
      return mockSongs.filter(s => s.album_id === albumId);
    }
  },

  // C. Playlists & Interaction
  playlists: {
    // GET /api/playlists/me
    getMine: async (): Promise<Playlist[]> => {
      await delay(400);
      return mockPlaylists;
    },
    // POST /api/playlists
    create: async (name: string): Promise<Playlist> => {
      await delay(500);
      const newPlaylist: Playlist = {
        id: `play-uuid-${Math.random().toString(36).substr(2, 9)}`,
        user_id: mockUsers[0].id,
        name,
        is_public: true,
        image_url: 'https://picsum.photos/seed/new/400/400'
      };
      mockPlaylists.push(newPlaylist);
      return newPlaylist;
    },
    // POST /api/playlists/:id/add
    addSong: async (playlistId: string, songId: string): Promise<void> => {
      await delay(300);
      mockPlaylistSongs.push({
        playlist_id: playlistId,
        song_id: songId,
        added_at: new Date().toISOString()
      });
    },
    // GET /api/playlists/:id/songs (Simulation of Many-to-Many join)
    getSongs: async (playlistId: string): Promise<Song[]> => {
      await delay(300);
      const songIds = mockPlaylistSongs
        .filter(ps => ps.playlist_id === playlistId)
        .map(ps => ps.song_id);
      return mockSongs.filter(s => songIds.includes(s.id));
    }
  }
};
