import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataBaseService } from '../../data-base/data-base.service';

@Injectable()
export class ArtistsService {
  artistsDB: any[];

  constructor(private dataBase: DataBaseService) {
    this.artistsDB = dataBase.db.artist;
  }

  getArtists() {
    return this.artistsDB;
  }

  getArtistById(id: string) {
    return this.artistsDB.find(artist => artist.id === id);
  }

  addNewArtist(artist) {
    const newArtist = {
      ...artist,
      id: uuidv4(),
    };
    this.artistsDB.push(newArtist);
    return newArtist;
  }

  updateArtist(artist) {
    const index = this.artistsDB.findIndex(a => a.id === artist.id);
    if (index !== -1) {
      this.artistsDB[index] = artist;
      return artist;
    }
    return null;
  }

  deleteArtist(artistId: string) {
    const initialLength = this.artistsDB.length;
    this.artistsDB = this.artistsDB.filter(artist => artist.id !== artistId);
    return this.artistsDB.length !== initialLength;
  }
}
