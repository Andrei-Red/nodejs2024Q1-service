import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AlbumsService } from './albums/albums.service';
import { TracksService } from './tracks/tracks.service';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesController } from './favorites/favorites.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';

@Module({
  imports: [UserModule],
  providers: [AlbumsService, TracksService, FavoritesService, ArtistsService],
  controllers: [FavoritesController, TracksController, AlbumsController, ArtistsController],
})
export class ApplicationModule {}
