import {
  ParseUUIDPipe,
  HttpCode,
  Controller,
  Delete,
  Get,
  Post,
  Param,
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post(':type/:id')
  createFavorite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favoriteService.createFavorite(id, type)
  }

  @Get()
  findAllFavorites() {
    return this.favoriteService.findAllFavorites()
  }

  @Delete(':type/:id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favoriteService.removeType(id, type)
  }
}
