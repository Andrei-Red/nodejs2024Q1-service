import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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

  updateTrack(track) {
    const index = this.tracksDB.findIndex(t => t.id === track.id);
    if (index !== -1) {
      this.tracksDB[index] = track;
      return track;
    }
    return null;
  }

  deleteTrack(trackId: string) {
    const initialLength = this.tracksDB.length;
    this.tracksDB = this.tracksDB.filter(track => track.id !== trackId);
    return this.tracksDB.length !== initialLength;
  }
}
