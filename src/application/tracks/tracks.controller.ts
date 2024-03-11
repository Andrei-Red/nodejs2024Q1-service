import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  addNewTrack(@Body() track) {
    return this.trackService.addNewTrack(track);
  }

  @Put()
  updateTrack(@Body() track) {
    return this.trackService.updateTrack(track);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
