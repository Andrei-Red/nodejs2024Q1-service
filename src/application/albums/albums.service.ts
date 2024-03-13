import { v4 as uuid4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumsDto, UpdateAlbumsDto } from './albums.dto';
import { DataBaseService } from '../../data-base/data-base.service';
import { DbEntities, Track } from '../../data-base/dataInteface';

@Injectable()
export class AlbumsService {
  constructor(private db: DataBaseService) {}
  createNewAlbum({ name, year, artistId }: CreateAlbumsDto) {
    return {
      id: uuid4(),
      name: name,
      year: year,
      artistId: artistId,
    };
  }
  async createAlbum(createAlbumDto: CreateAlbumsDto) {
    const conditionArtist = this.db.verifyEntityPresence(
      createAlbumDto.artistId,
      DbEntities.ARTISTS,
    );
    if (conditionArtist && createAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with ID ${createAlbumDto.artistId} not found`,
      );
    }
    const newAlbum = this.createNewAlbum(createAlbumDto);
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  async findAllAlbums() {
    return this.db.albums;
  }

  async findOneAlbum(id: string) {
    const currentAlbum = this.db.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return currentAlbum;
  }

  async updateAlbum(id: string, UpdateAlbumsDto: UpdateAlbumsDto) {
    const currentAlbum = await this.findOneAlbum(id);
    const conditionArtist = this.db.verifyEntityPresence(
      UpdateAlbumsDto.artistId,
      DbEntities.ARTISTS,
    );
    if (conditionArtist && UpdateAlbumsDto.artistId) {
      throw new NotFoundException(
        `Artist with ID ${UpdateAlbumsDto.artistId} not found`,
      );
    }
    currentAlbum.artistId = UpdateAlbumsDto.artistId;
    currentAlbum.name = UpdateAlbumsDto.name;
    currentAlbum.year = UpdateAlbumsDto.year;
    return currentAlbum;
  }

  async removeAlbum(id: string) {
    const currentAlbum = await this.findOneAlbum(id);
    const index = this.db.albums.findIndex((u) => u.id === currentAlbum.id);
    this.db.tracks.forEach((track: Track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumsId: string) => albumsId !== id,
    );

    if (index !== -1) {
      this.db.albums.splice(index, 1);
    }
  }
}
