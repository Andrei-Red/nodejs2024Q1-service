import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  addNewArtist(@Body() artist) {
    return this.artistService.addNewArtist(artist);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() artist) {
    return this.artistService.updateArtist(artist, id);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
