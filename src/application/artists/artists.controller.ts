import {
  ParseUUIDPipe,
  Controller,
  HttpCode,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistsDto, UpdateArtistsDto } from './artists.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistsDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  findAllArtists() {
    return this.artistsService.findAllArtists();
  }

  @Get(':id')
  findOneArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.findOneArtist(id);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistsDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.removeArtist(id);
  }
}
