// favorites.service.ts
import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../../data-base/data-base.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  favoritesDB: {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[];
  };

  constructor(
    private dataBase: DataBaseService,
    private artistService: ArtistsService,
    private albumsService: AlbumsService,
    private trackService: TracksService,
  ) {
    this.favoritesDB = dataBase.db.favs;
  }

  getFavorites() {
    return this.favoritesDB;
  }

  addFavoriteTrack(trackId: string) {
    const track = this.trackService.getTrackById(trackId);
    if (!track) {
      throw new Error('Track not found');
    }
    if (!this.favoritesDB.tracks.includes(trackId)) {
      this.favoritesDB.tracks.push(trackId);
    }
    return 'Track added to favorites';
  }

  removeFavoriteTrack(trackId: string) {
    const index = this.favoritesDB.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favoritesDB.tracks.splice(index, 1);
      return 'Track removed from favorites';
    }
    throw new Error('Track not found in favorites');
  }

  addFavoriteAlbum(albumId: string) {
    const album = this.albumsService.getAlbumById(albumId);
    if (!album) {
      throw new Error('Album not found');
    }
    if (!this.favoritesDB.albums.includes(albumId)) {
      this.favoritesDB.albums.push(albumId);
    }
    return 'Album added to favorites';
  }

  removeFavoriteAlbum(albumId: string) {
    const index = this.favoritesDB.albums.indexOf(albumId);
    if (index !== -1) {
      this.favoritesDB.albums.splice(index, 1);
      return 'Album removed from favorites';
    }
    throw new Error('Album not found in favorites');
  }

  addFavoriteArtist(artistId: string) {
    const artist = this.artistService.getArtistById(artistId);
    if (!artist) {
      throw new Error('Artist not found');
    }
    if (!this.favoritesDB.artists.includes(artistId)) {
      this.favoritesDB.artists.push(artistId);
    }
    return 'Artist added to favorites';
  }

  removeFavoriteArtist(artistId: string) {
    const index = this.favoritesDB.artists.indexOf(artistId);
    if (index !== -1) {
      this.favoritesDB.artists.splice(index, 1);
      return 'Artist removed from favorites';
    }
    throw new Error('Artist not found in favorites');
  }
}
