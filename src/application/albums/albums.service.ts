import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataBaseService } from '../../data-base/data-base.service';

@Injectable()
export class AlbumsService {
  albumsDB: any[];

  constructor(private dataBase: DataBaseService) {
    const test = dataBase;
    this.albumsDB = test.db.album;
  }

  getAlbums() {
    return this.albumsDB;
  }

  getAlbumById(id: string) {
    return this.albumsDB.find((album) => album.id === id);
  }

  addNewAlbum(album) {
    const newAlbum = {
      ...album,
      id: uuidv4(),
    };
    this.albumsDB.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(album) {
    const index = this.albumsDB.findIndex((a) => a.id === album.id);
    if (index !== -1) {
      this.albumsDB[index] = album;
      return album;
    }
    return null;
  }

  deleteAlbum(albumId: string) {
    const initialLength = this.albumsDB.length;
    this.albumsDB = this.albumsDB.filter((album) => album.id !== albumId);
    return this.albumsDB.length !== initialLength;
  }
}
