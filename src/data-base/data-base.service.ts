import { Injectable } from '@nestjs/common';
import {
  Album,
  Artist,
  DbEntities,
  Favorites,
  Track,
  User,
} from './dataInteface';

@Injectable()
export class DataBaseService {
  users: User[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];

  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  verifyEntityPresence(entityId: string, entityType: DbEntities): boolean {
    const entities: any = this[entityType];
    const matchingEntity = entities?.find((entity) => entity.id === entityId);
    return !matchingEntity;
  }
}
