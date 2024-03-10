import { Injectable } from '@nestjs/common';
// import DB from 'db.json';
@Injectable()
export class DataBaseService {
  db: any;
  constructor() {
    this.db = {
      user: [],
      track: [],
      artist: [],
      favs: [],
    };
  }
}
