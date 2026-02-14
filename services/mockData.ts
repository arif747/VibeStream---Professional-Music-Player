
import { User, Artist, Album, Song, Playlist, SubscriptionStatus, PlaylistSong } from '../types';

export const mockUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'alex_vibe',
    email: 'alex@vibestream.com',
    subscription_status: SubscriptionStatus.PREMIUM,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    created_at: new Date().toISOString(),
  }
];

export const mockArtists: Artist[] = [
  { id: 'art-uuid-01', name: 'Neon Echo', bio: 'Synthwave explorer from Berlin.', image_url: 'https://picsum.photos/seed/artist1/400/400' },
  { id: 'art-uuid-02', name: 'Luna Keys', bio: 'Soulful piano and jazz fusion.', image_url: 'https://picsum.photos/seed/artist2/400/400' },
  { id: 'art-uuid-03', name: 'The Void', bio: 'Dark ambient and cinematic textures.', image_url: 'https://picsum.photos/seed/artist3/400/400' },
  { 
    id: 'art-uuid-tipex', 
    name: 'Tipe-X', 
    bio: 'Pionir musik Ska di Indonesia yang aktif sejak tahun 1995.', 
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop' 
  },
  { 
    id: 'art-uuid-bondan', 
    name: 'Bondan Prakoso', 
    bio: 'Musisi lintas genre yang dikenal lewat kolaborasi ikonik bersama Fade 2 Black.', 
    image_url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop' 
  },
];

export const mockAlbums: Album[] = [
  { id: 'alb-uuid-01', artist_id: 'art-uuid-01', title: 'Midnight Drive', release_year: 2023, cover_art_url: 'https://picsum.photos/seed/alb1/400/400' },
  { id: 'alb-uuid-02', artist_id: 'art-uuid-02', title: 'Serene Shadows', release_year: 2024, cover_art_url: 'https://picsum.photos/seed/alb2/400/400' },
  { id: 'alb-uuid-tipex-01', artist_id: 'art-uuid-tipex', title: 'Super Surprise', release_year: 2003, cover_art_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop' },
  { id: 'alb-uuid-bondan-01', artist_id: 'art-uuid-bondan', title: 'For All', release_year: 2010, cover_art_url: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop' },
];

export const mockSongs: Song[] = [
  {
    id: 'song-uuid-tipex-01',
    album_id: 'alb-uuid-tipex-01',
    artist_id: 'art-uuid-tipex',
    title: 'Genit',
    duration_seconds: 204,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Ska',
    play_count: 85420,
    artist_name: 'Tipe-X',
    cover_art: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'
  },
  {
    id: 'song-uuid-tipex-02',
    album_id: 'alb-uuid-tipex-01',
    artist_id: 'art-uuid-tipex',
    title: 'Salam Rindu',
    duration_seconds: 228,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Ska',
    play_count: 92150,
    artist_name: 'Tipe-X',
    cover_art: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'
  },
  {
    id: 'song-uuid-bondan-01',
    album_id: 'alb-uuid-bondan-01',
    artist_id: 'art-uuid-bondan',
    title: 'Ya Sudahlah',
    duration_seconds: 235,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Pop Rock',
    play_count: 154200,
    artist_name: 'Bondan Prakoso & Fade 2 Black',
    cover_art: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop'
  },
  {
    id: 'song-uuid-bondan-02',
    album_id: 'alb-uuid-bondan-01',
    artist_id: 'art-uuid-bondan',
    title: 'Bunga',
    duration_seconds: 215,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Rap Rock',
    play_count: 75300,
    artist_name: 'Bondan Prakoso & Fade 2 Black',
    cover_art: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop'
  },
  {
    id: 'song-uuid-01',
    album_id: 'alb-uuid-01',
    artist_id: 'art-uuid-01',
    title: 'Neon Horizon',
    duration_seconds: 215,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Synthwave',
    play_count: 1542,
    artist_name: 'Neon Echo',
    cover_art: 'https://picsum.photos/seed/alb1/400/400'
  },
  {
    id: 'song-uuid-02',
    album_id: 'alb-uuid-01',
    artist_id: 'art-uuid-01',
    title: 'Electric Night',
    duration_seconds: 180,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    genre: 'Synthwave',
    play_count: 2305,
    artist_name: 'Neon Echo',
    cover_art: 'https://picsum.photos/seed/alb1/400/400'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'play-uuid-01',
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Indonesian Legends',
    is_public: true,
    image_url: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=400&h=400&fit=crop'
  }
];

export const mockPlaylistSongs: PlaylistSong[] = [
  { playlist_id: 'play-uuid-01', song_id: 'song-uuid-tipex-01', added_at: new Date().toISOString() },
  { playlist_id: 'play-uuid-01', song_id: 'song-uuid-bondan-01', added_at: new Date().toISOString() },
];
