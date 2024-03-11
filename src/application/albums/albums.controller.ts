import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  addNewAlbum(@Body() album) {
    return this.albumsService.addNewAlbum(album);
  }

  @Put()
  updateAlbum(@Body() album) {
    return this.albumsService.updateAlbum(album);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
