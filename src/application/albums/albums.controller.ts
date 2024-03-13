import {
  ParseUUIDPipe,
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto, UpdateAlbumsDto } from './albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumsDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Get()
  findAllAlbums() {
    return this.albumsService.findAllAlbums();
  }

  @Get(':id')
  findOneAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsService.findOneAlbum(id);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumsDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsService.removeAlbum(id);
  }
}
