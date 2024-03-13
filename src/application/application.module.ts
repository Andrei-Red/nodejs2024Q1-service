import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumsService } from './albums/albums.service';
import { TracksService } from './tracks/tracks.service';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { DataBaseModule } from '../data-base/data-base.module';
import { DataBaseService } from '../data-base/data-base.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [UserModule, DataBaseModule],
  providers: [
    DataBaseService,
    AlbumsService,
    TracksService,
    ArtistsService,
    FavoritesService,
  ],
  controllers: [
    TracksController,
    AlbumsController,
    ArtistsController,
    FavoritesController,
  ],
})
export class ApplicationModule {}
