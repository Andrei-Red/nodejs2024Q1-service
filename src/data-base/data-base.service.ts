import { Injectable } from '@nestjs/common';
import { Album, Artist, DbEntities, Track } from './dataInteface';

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
