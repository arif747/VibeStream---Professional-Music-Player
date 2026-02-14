
export enum SubscriptionStatus {
  FREE = 'free',
  PREMIUM = 'premium'
}

export interface User {
  id: string; // UUID
  username: string;
  email: string;
  password_hash?: string;
  avatar_url?: string;
  subscription_status: SubscriptionStatus;
  created_at: string;
}

export interface Artist {
  id: string; // UUID
  name: string;
  bio?: string;
  image_url?: string;
}

export interface Album {
  id: string; // UUID
  artist_id: string;
  title: string;
  cover_art_url?: string;
  release_year?: number;
}

export interface Song {
  id: string; // UUID
  album_id?: string;
  artist_id: string;
  title: string;
  duration_seconds: number;
  file_url: string; // S3 Link
  genre?: string;
  play_count: number;
  // Join helpers
  artist_name?: string;
  cover_art?: string;
}

export interface Playlist {
  id: string; // UUID
  user_id: string;
  name: string;
  is_public: boolean;
  image_url?: string;
}

export interface PlaylistSong {
  playlist_id: string;
  song_id: string;
  added_at: string;
}

export interface PlayState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  queue: Song[];
}
