import { Injectable } from '@nestjs/common';
import { Album, DbEntities } from './dataInteface';
// import { Album } from '../application/albums/albums.dto';
// import DB from 'db.json';
@Injectable()
export class DataBaseService {
  users: UserEntity[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];

  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  verifyEntityPresence(entityId: string, entityType: DbEntities): boolean {
    const entities = this[entityType];
    const matchingEntity = entities.find((entity) => entity.id === entityId);
    return matchingEntity ? false : true;
  }
}
