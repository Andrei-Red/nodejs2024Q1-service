import { Injectable } from '@nestjs/common';
// import DB from 'db.json';
@Injectable()
export class DataBaseService {
  db: {
    user: any[];
    track: any[];
    artist: any[];
    album: any[];
    favs: {
      artists: string[]; // favorite artists ids
      albums: string[]; // favorite albums ids
      tracks: string[];
    };
  };
  constructor() {
    this.db = {
      user: [],
      track: [],
      artist: [],
      album: [],
      favs: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }
}
