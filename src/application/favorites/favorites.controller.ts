import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  addFavoriteTrack(@Param('id') trackId: string) {
    return this.favoritesService.addFavoriteTrack(trackId);
  }

  @Delete('/track/:id')
  removeFavoriteTrack(@Param('id') trackId: string) {
    return this.favoritesService.removeFavoriteTrack(trackId);
  }

  @Post('/album/:id')
  addFavoriteAlbum(@Param('id') albumId: string) {
    return this.favoritesService.addFavoriteAlbum(albumId);
  }

  @Delete('/album/:id')
  removeFavoriteAlbum(@Param('id') albumId: string) {
    return this.favoritesService.removeFavoriteAlbum(albumId);
  }

  @Post('/artist/:id')
  addFavoriteArtist(@Param('id') artistId: string) {
    return this.favoritesService.addFavoriteArtist(artistId);
  }

  @Delete('/artist/:id')
  removeFavoriteArtist(@Param('id') artistId: string) {
    return this.favoritesService.removeFavoriteArtist(artistId);
  }
}
