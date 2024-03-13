export const enum DbEntities {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  USERS = 'users',
  TRACKS = 'tracks',
}

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}