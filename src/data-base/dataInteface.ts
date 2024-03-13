export const enum DbEntities {
  USERS = 'users',
  TRACKS = 'tracks',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
}
export interface Album {
  name: string
  year: number
  artistId: string | null
  id: string
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}