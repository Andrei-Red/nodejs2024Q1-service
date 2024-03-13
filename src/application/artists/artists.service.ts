import { v4 as uuid4 } from 'uuid'

import { Injectable, NotFoundException } from '@nestjs/common'
import { DataBaseService } from '../../data-base/data-base.service'
import { CreateArtistsDto, UpdateArtistsDto } from './artists.dto'
import { Artist } from '../../data-base/dataInteface'

@Injectable()
export class ArtistsService {
  constructor(private db: DataBaseService) {}
  private createNewArtist({ name, grammy }: CreateArtistsDto) {
    return {
      id: uuid4(),
      name: name,
      grammy: grammy,
    }
  }

  async createArtist(createArtistsDto: CreateArtistsDto): Promise<Artist> {
    const newArtist = this.createNewArtist(createArtistsDto)
    // TODO: add "await" when implemented in DB
    this.db.artists.push(newArtist)
    return newArtist
  }
  async findAllArtists() {
    return this.db.artists
  }

  async findOneArtist(id: string) {
    const currentArtist = this.db.artists.find((artist) => artist.id === id)
    if (!currentArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`)
    }
    return currentArtist
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistsDto) {
    const currentArtist = await this.findOneArtist(id)

    currentArtist.name = updateArtistDto.name
    currentArtist.grammy = updateArtistDto.grammy

    return currentArtist
  }

  async removeArtist(id: string) {
    const artistExists = this.db.artists.some((artist) => artist.id === id)
    if (!artistExists) {
      throw new NotFoundException(`Artist with ID ${id} not found`)
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null
      }
    })

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null
      }
    })

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (storedId) => storedId !== id,
    )

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id)
  }
}
