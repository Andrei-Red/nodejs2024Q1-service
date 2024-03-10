import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistService } from './artist/artist.service';
import { AlbumsService } from './albums/albums.service';
import { TracksService } from './tracks/tracks.service';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [UserModule],
  providers: [ArtistService, AlbumsService, TracksService, FavoritesService],
})
export class ApplicationModule {}
