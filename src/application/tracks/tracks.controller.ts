import {
  ParseUUIDPipe,
  HttpCode,
  Controller,
  Get,
  Put,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTracksDto, UpdateTracksDto } from './tracks.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  createTrack(@Body() createTrackDto: CreateTracksDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  findAllTracks() {
    return this.trackService.findAllTracks();
  }

  @Get(':id')
  findOneTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findOneTrack(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTracksDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.removeTrack(id);
  }
}
