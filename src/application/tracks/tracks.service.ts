import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { DataBaseService } from '../../data-base/data-base.service';

@Injectable()
export class TracksService {
  tracksDB: any[];

  constructor(private dataBase: DataBaseService) {
    this.tracksDB = dataBase.db.track;
  }

  getTracks() {
    return this.tracksDB;
  }

  getTrackById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tracksDB.find(track => track.id === id);
  }

  addNewTrack(track) {
    const newTrack = {
      ...track,
      id: uuidv4(),
    };
    this.tracksDB.push(newTrack);
    return newTrack;
  }

  updateTrack(track, id) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const index = this.tracksDB.findIndex(t => t.id === track.id);
    if (index !== -1) {
      this.tracksDB[index] = track;
      return track;
    }
    return null;
  }

  deleteTrack(trackId: string) {
    if (!uuidValidate(trackId)) {
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const initialLength = this.tracksDB.length;
    this.tracksDB = this.tracksDB.filter(track => track.id !== trackId);
    return this.tracksDB.length !== initialLength;
  }
}
